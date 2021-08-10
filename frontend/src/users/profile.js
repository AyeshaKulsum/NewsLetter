import { useEffect, useState } from "react"
import Base from "../Base"
import { profile } from "./helper/userhelper"
import { unsubscribe } from "../articles/helper/articlehelper"


const Profile = () => {

    const [user, setUser] = useState([])
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    useEffect(() => {
        profile().then(async (user) => {
            let tempUser = await user.json()
            setUser(tempUser)
            setUserName(tempUser[0].userName)
            setUserEmail(tempUser[0].email)
        }).catch((err) => { console.log(err); })
    }, [])
    const unsubscribebtn = (source_id) => {
        console.log(source_id);
        unsubscribe(source_id).then(response => {
            console.log(response);
        }).catch(err => console.log(err))
    }

    const errorMsg = () => {
        if (!user) {
            return (
                <h1> No Data found</h1>
            )
        }

    }
    return (
        <Base title="Profile">
            <div>
                User Name : {userName}
            </div>
            <div>
                Email : {userEmail}
            </div>
            <div className="row">

                {user && user.map((u) => {
                    return (
                        <div key={u.source_id} className="card col-md-3 mx-1  my-2 border border-success">
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
            {errorMsg()}
        </Base>
    )
}

export default Profile;