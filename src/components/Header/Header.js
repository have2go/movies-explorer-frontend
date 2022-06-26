import React from "react";

import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";

function Header({ location }) {
    return (
        <header className={"header"}>
            <Logo />
            {location === "/" ? (
                <Navigation location={location} />
            ) : window.innerWidth > 768 ? (
                <Navigation location={location} />
            ) : (
                <Sidebar />
            )}
        </header>
    );
}

export default Header;
