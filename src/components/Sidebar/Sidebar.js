import React from "react";

import "./Sidebar.css";
import accImg from "../../images/account.svg";
import { Link } from "react-router-dom";

function Sidebar() {

    function handleButtonClick(e) {
        e.preventDefault();
        e.target.nextSibling.classList.toggle("sidebar_visible");
        e.target.classList.toggle("sidebar__btn_close");
        e.target.previousSibling.classList.toggle("sidebar-overflow_visible");
    }

    return (
        <>
            <div className="sidebar-overflow"></div>
            <button
                className="sidebar__btn"
                type="button"
                onClick={handleButtonClick}></button>
            <div className="sidebar">
                <nav className="sidebar__menu">
                    <div className="sidebar__links">
                        <Link className="sidebar__link" to="/">
                            Главная
                        </Link>
                        <Link className="sidebar__link" to="/movies">
                            Фильмы
                        </Link>
                        <Link className="sidebar__link" to="/saved-movies">
                            Сохраненные фильмы
                        </Link>
                    </div>
                    <Link className="sidebar__account-link" to="/profile">
                        <img src={accImg} alt="Аккаунт" />
                    </Link>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;
