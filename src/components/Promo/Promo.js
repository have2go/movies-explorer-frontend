import React from "react";

import "./Promo.css";
import logoPath from "../../images/logo-praktikum.svg";

function Promo() {
    return (
        <section className="promo">
            <img
                className="promo__logo"
                src={logoPath}
                alt="yandex-praktikum"
            />
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
        </section>
    );
}

export default Promo;
