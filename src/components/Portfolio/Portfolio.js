import React from "react";

import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__container">
                <h4 className="portfolio__title">Портфолио</h4>
                <a
                    className="portfolio__link"
                    href="https://have2go.github.io/how-to-learn/"
                    target="_blank"
                    rel="noreferrer">
                    Статичный сайт
                    <span className="portfolio__arrow"></span>
                </a>
                <a
                    className="portfolio__link"
                    href="https://have2go.github.io/russian-travel/"
                    target="_blank"
                    rel="noreferrer">
                    Адаптивный сайт
                    <span className="portfolio__arrow"></span>
                </a>
                <a
                    className="portfolio__link"
                    href="https://ad.mesto.nomoredomains.xyz/"
                    target="_blank"
                    rel="noreferrer">
                    Одностраничное приложение
                    <span className="portfolio__arrow"></span>
                </a>
            </div>
        </section>
    );
}

export default Portfolio;
