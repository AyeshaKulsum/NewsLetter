import { useEffect, useState } from "react";

import Base from "../Base";
import { isAutheticated, login } from "./helper/userhelper"


const Login = () => {
    //const [user, setUser] = useState({ email: 'd@gmail.com', password: '1234' })
    const [values, setValues] = useState({ email: '', password: '' })

    const handleChange = (name) => (event) => {
        setValues({ ...values, name: event.target.value })
    }
    const { email, password } = values
    const onSubmit = (event) => {
        login(values).then(response => {
            console.log(response);
        }).catch(err => { console.log(err); })
    }
    const user = isAutheticated()
    const loginForm = () => {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <input className="form-control" onChange={handleChange("email")} name="email" placeholder="Please enter Email here" value={email} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" onChange={handleChange("password")} name="password" placeholder="Please enter Password here" value={password} />
                    </div>
                    <button type="submit" onSubmit={onSubmit} className="btn btn-outline-success mb-3">Login</button>
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