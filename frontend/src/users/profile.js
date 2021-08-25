import { useEffect, useState } from "react"
import Base from "../base"
import { unsubscribe } from "../articles/helper/articlehelper"
import { fetchArticlesFromServer, profileFromServer } from "../redux/actions/actionCreator"
import { useDispatch, useSelector } from "react-redux"


const Profile = () => {

    const { email, userName, subscribedSources } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileFromServer())
    }, [])

    const unsubscribebtn = (source_id) => {
        unsubscribe(source_id).then(response => {
            dispatch(fetchArticlesFromServer())
            dispatch(profileFromServer())
        }).catch(err => dispatch(fetchErrorMessage(err.message)))
    }

    return (
        <Base title="Profile">
            <div>
                User Name : {userName}
            </div>
            <div>
                Email : {email}
            </div>
            <div className="row">

                {subscribedSources && subscribedSources.map((u) => {
                    return (
                        <div key={u.source_id} className="card col-md-3 mx-3  my-3 border border-success">
                            {/* col-md-3  offset-md-1 my-2  */}
                            <div className="card-body">
                                <h5 className="card-title">{u.Title}</h5>
                                <button className="btn btn-primary" onClick={() => {
                                    unsubscribebtn(u.source_id)
                                }}>Unsubscribe</button>
                                {/* <div style={{ position: "relative" }}> 
                                    <span style={{ position: "absolute", right: "10px", top: "0px" }}>{u.Title}</span></div> */}

                            </div>
                        </div>
                    );
                })}

            </div>
        </Base>
    )
}

export default Profile;