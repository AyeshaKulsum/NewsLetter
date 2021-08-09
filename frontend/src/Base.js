import React from "react";
import Menu from "./Menu";

const Base = ({
    title = "Title",
    description = "",
    className = "",
    children
}) => (
    <div>
        <Menu />
        <div className="container-fluid">
            <div className="jumbotron   text-center">
                <h2 className="display-4">{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto py-3">
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
    </div>
);

export default Base;
