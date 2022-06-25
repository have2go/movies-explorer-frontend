import React from "react";

import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__container">
                <p className="footer__date">© 2022</p>
                <nav className="footer__links">
                    <a
                        className="footer__link"
                        href="https://practicum.yandex.ru/"
                        target="_blank"
                        rel="noreferrer">
                        Яндекс.Практикум
                    </a>
                    <a
                        className="footer__link"
                        href="https://github.com/have2go"
                        target="_blank"
                        rel="noreferrer">
                        Github
                    </a>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
