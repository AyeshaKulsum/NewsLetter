import { useState } from "react";
import Base from "../base";


const SignUp = () => {
    const [values, setValues] = useState({ email: '', password: '', userName: '' })

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }

    const { email, password, userName } = values
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
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-success mb-3" style={{ marginRight: "5px" }}>Signup</button>
                        <a className="btn btn-outline-success mb-3 ml-1" href="/auth/google" role="button">
                            <img width="20px" style={{ marginRight: "5px", marginBottom: "3px" }} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                            Login with Google
                        </a>
                    </div>
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