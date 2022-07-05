import React from "react";

import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";

function Header({ loggedIn }) {
    return (
        <header className={"header"}>
            <Logo />
            {loggedIn && (window.innerWidth > 768) && <Navigation loggedIn={loggedIn} />}
            {loggedIn && (window.innerWidth <= 768) && <Sidebar />}
            {!loggedIn && <Navigation loggedIn={loggedIn} />}
        </header>
    );
}

export default Header;
