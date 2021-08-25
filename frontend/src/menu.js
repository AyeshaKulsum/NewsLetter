import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logoutSuccess } from "./redux/actions/actionCreator";
import { logout } from "./users/helper/userhelper";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" };
    } else {
        return { color: "#FFFFFF" };
    }
};


const Menu = ({ history }) => {
    const isAuth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    return (


        <div>
            <ul className="nav nav-tabs bg-dark">
                {isAuth && (
                    <li className="nav-item">
                        <Link style={currentTab(history, "/")} className="nav-link" to="/">
                            Home
                        </Link>
                    </li>)}
                {isAuth && (
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/user-subscribe")}
                            className="nav-link"
                            to="/user-subscribe"
                        >
                            Subscribe
                        </Link>
                    </li>
                )}
                {isAuth && (
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/user-profile")}
                            className="nav-link"
                            to="/user-profile"
                        >
                            Profile
                        </Link>
                    </li>
                )}
                {isAuth && (
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/all-sources")}
                            className="nav-link"
                            to="/all-sources"
                        >
                            All Sources
                        </Link>
                    </li>
                )}
                {isAuth && (
                    <li className="nav-item">
                        <span
                            className="nav-link text-warning"
                            onClick={() => {
                                logout().then(() => {
                                    dispatch(logoutSuccess())
                                    history.push("/login");
                                })

                            }}
                        >
                            Logout
                        </span>
                    </li>
                )}

                {!isAuth && (
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/login")}
                            className="nav-link"
                            to="/login"
                        >
                            Login
                        </Link>
                    </li>
                )}

                {!isAuth && (
                    <li className="nav-item">
                        <Link

                            style={currentTab(history, "/signup")}
                            className="nav-link"
                            to="/signup"
                        >
                            SignUp
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );

}
export default withRouter(Menu);
