import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Base from "../Base";
import { fetchErrorMessage, fetchSuccessMessage, fetchUserDetails, loginSuccess } from "../redux/actions/actionCreator";
import { login } from "./helper/userhelper";


const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' })
    const history = useHistory()
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }
    const dispatch = useDispatch();

    const { email, password } = values
    const onSubmit = (event) => {
        event.preventDefault();
        login(values).then(async response => {
            if (response.status === 200) {
                dispatch(loginSuccess());
                history.push("/")
            }
            else {
                let a = await response.json();
                dispatch(fetchErrorMessage(a.message));
            }

        }).catch(err => {
            dispatch(fetchErrorMessage('Unable to login'));
        })
    }
    const loginForm = () => {
        return (
            <div className="container">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input className="form-control my-2" onChange={handleChange("email")} name="email" placeholder="Please enter Email here" value={email} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control my-2" onChange={handleChange("password")} name="password" placeholder="Please enter Password here" value={password} />
                    </div>
                    <button type="submit" className="btn btn-outline-success mb-3">Login</button>
                    <a className="btn btn-outline-success mb-3" href="/auth/google">Login with Google</a>

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