import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAutheticated, logout } from "./users/helper/userhelper";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" };
    } else {
        return { color: "#FFFFFF" };
    }
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            {isAutheticated() && (
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                        Home
                    </Link>
                </li>)}
            {isAutheticated() && (
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
            {isAutheticated() && (
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
            {isAutheticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link text-warning"
                        onClick={() => {
                            logout().then(() => {
                                history.push("/");
                            })

                        }}
                    >
                        Logout
                    </span>
                </li>
            )}

            {!isAutheticated() && (
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

            {!isAutheticated() && (
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

export default withRouter(Menu);
