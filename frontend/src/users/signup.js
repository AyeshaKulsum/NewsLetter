import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Base from "../Base";
import { fetchErrorMessage, loginSuccess } from "../redux/actions/actionCreator";
import { signup } from "./helper/userhelper"


const SignUp = () => {
    const [values, setValues] = useState({ email: '', password: '', userName: '' })
    const history = useHistory()
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }
    const dispatch = useDispatch();
    const { email, password, userName } = values
    const onSubmit = (event) => {
        event.preventDefault();
        // signup(values).then(response => {
        //     history.push("/login")
        // }).catch(err => { dispatch(fetchErrorMessage(err.message)); })
        return true;
    }
    const signupForm = () => {
        return (
            <div className="container">
                <form method="post" action="/signup">
                    <div className="form-group">
                        <input type="text" className="form-control my-2" onChange={handleChange("userName")} name="userName" placeholder="Please enter User Name here" value={userName} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control my-2" onChange={handleChange("email")} name="email" placeholder="Please enter Email here" value={email} />

                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control my-2" onChange={handleChange("password")} name="password" placeholder="Please enter Password here" value={password} />
                    </div>
                    <button type="submit" className="btn btn-outline-success mb-3">Signup</button>
                </form>

            </div>)
    }
    return (
        <Base title="SignUp" description="Please enter details to register">
            <div className="row">
                {signupForm()}
            </div>

        </Base>

    )
}

export default SignUp;