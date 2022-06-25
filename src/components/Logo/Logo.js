import React from "react";

import "./Logo.css";
import logoPath from "../../images/logo-header.svg";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link className="logo" to="/">
            <img className="logo__img" src={logoPath} alt="logo" />
        </Link>
    );
}

export default Logo;
