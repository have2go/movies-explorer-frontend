import React from "react";

import "./Navigation.css";
import accImg from "../../images/account.svg";
import { Link } from "react-router-dom";

function Navigation({ location }) {
    return location === "/" ? (
        <nav className="nav">
            <Link className="nav__signup-link" to="/signup">
                Регистрация
            </Link>
            <Link className="nav__signin-btn" to="/signin">
                Войти
            </Link>
        </nav>
    ) : (
        <>
            <nav className="nav">
                <Link className="nav__movies" to="/movies">
                    Фильмы
                </Link>
                <Link className="nav__saved-movies" to="/saved-movies">
                    Сохраненные фильмы
                </Link>
            </nav>
            <Link className="nav-account" to="/profile">
                <img src={accImg} alt="Аккаунт" />
            </Link>
        </>
    );
}

export default Navigation;
