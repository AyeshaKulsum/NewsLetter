import { useEffect, useState } from "react"
import Base from "../Base"
import { profile } from "./helper/userhelper"


const Profile = () => {

    const [user, setUser] = useState([])
    useEffect(() => {
        profile().then(async (user) => {
            setUser(await user.json())
        }).catch((err) => { console.log(err); })
    })

    return (
        <Base title="Profile">
            <div className="row">

                {user && user.map((u, index) => {
                    return (
                        <div key={index} className="card my-2 ml-1 mx-1 border border-success">
                            {/* col-md-3  offset-md-1 my-2  */}
                            <div className="card-body">
                                <h3 className="card-title">{u.userName}</h3>


                                <div style={{ position: "relative" }}> <span>{u.email}</span >
                                    <span style={{ position: "absolute", right: "10px", top: "0px" }}>{u.FeedUrl}</span></div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </Base>
    )
}

export default Profile;