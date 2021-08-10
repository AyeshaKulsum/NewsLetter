import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Base from "../Base";
import { login } from "./helper/userhelper";


const Login = () => {
    //const [user, setUser] = useState({ email: 'd@gmail.com', password: '1234' })
    const [values, setValues] = useState({ email: '', password: '' })
    const history = useHistory()
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }
    const { email, password } = values
    const onSubmit = (event) => {
        event.preventDefault();
        login(values).then(response => {
            history.push("/")
        }).catch(err => { console.log(err); })
    }
    // JSON.parse(atob(document.cookie.split("=")[1]))
    const loginForm = () => {
        return (
            <div className="container">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input className="form-control" onChange={handleChange("email")} name="email" placeholder="Please enter Email here" value={email} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" onChange={handleChange("password")} name="password" placeholder="Please enter Password here" value={password} />
                    </div>
                    <button type="submit" className="btn btn-outline-success mb-3">Login</button>
                </form>
            </div>)
    }
    return (
        <Base title="Login" description="Please enter details to login">
            <div className="row">
                {loginForm()}
            </div>

        </Base>

    )
}

export default Login;