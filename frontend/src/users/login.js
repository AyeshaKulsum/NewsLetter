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
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-success mb-3" style={{ marginRight: "5px" }} >Login</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <a className="btn btn-outline-success mb-3 ml-1" href="/auth/google" role="button">
                            <img width="20px" style={{ marginRight: "5px", marginBottom: "3px" }} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                            Login with Google
                        </a>
                    </div>
                </form>
            </div >)
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