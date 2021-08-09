import { useEffect, useState } from "react"
import Base from "../Base"
import { profile } from "./helper/userhelper"


const Profile = () => {

    const [user, setUser] = useState([])
    useEffect(() => {
        profile().then((user) => {
            setUser(user)
        }).catch((err) => { console.log(err); })
    })
    return (
        <Base title="Profile">

        </Base>
    )
}

export default Profile;