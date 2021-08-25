import React from "react";
import { useSelector } from "react-redux";
import Menu from "./menu";

const Base = ({
    title = "Title",
    description = "",
    className = "",
    children
}) => {

    const { success_message, error_message } = useSelector(state => state.messages);
    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success_message ? "" : "none" }}
                    >
                        {success_message}
                    </div>
                </div>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error_message ? "" : "none" }}
                    >
                        {error_message}
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <div>
                <Menu />
                <div className="container-fluid">
                    <div className="jumbotron   text-center">
                        <h2 className="display-4">{title}</h2>
                        <p className="lead">{description}</p>
                    </div>
                    {successMessage()}
                    {errorMessage()}
                    <div className={className}>{children}</div>
                </div>

            </div>
            <footer className="footer bg-dark mt-auto" style={{ position: "absolute", width: "100%", bottom: "0px" }}>
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions, feel free to reach out!</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                </div>
                <div className="container text-center">
                    <span className="text-muted ">
                        An Amazing <span className="text-white">RSS</span> Reader
                    </span>
                </div>
            </footer>
        </>
    )
};

export default Base;
