import React from "react";

import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__container">
                <h4 className="portfolio__title">Портфолио</h4>
                <a className="portfolio__link" href="/">
                    Статичный сайт
                    <span className="portfolio__arrow"></span>
                </a>
                <a className="portfolio__link" href="/">
                    Адаптивный сайт
                    <span className="portfolio__arrow"></span>
                </a>
                <a className="portfolio__link" href="/">
                    Одностраничное приложение
                    <span className="portfolio__arrow"></span>
                </a>
            </div>
        </section>
    );
}

export default Portfolio;
