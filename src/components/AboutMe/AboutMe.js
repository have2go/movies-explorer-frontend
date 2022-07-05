import React from "react";

import "./AboutMe.css";
import myPhoto from "../../images/me.jpg";

function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <div className="about-me__container">
                <h2 className="about-me__title">Студент</h2>
                <div className="about-me__content">
                    <img
                        className="about-me__photo"
                        alt="Alexey"
                        src={myPhoto}
                    />
                    <div className="about-me__text-block">
                        <div className="about-me__text-container">
                            <h3 className="about-me__name">Алексей</h3>
                            <p className="about-me__profession">
                                Фронтенд-разработчик, 21 год
                            </p>
                            <p className="about-me__text">
                                Здесь будет инофрмация обо мне.
                            </p>
                        </div>
                        <a
                            className="about-me__link"
                            href="https://github.com/have2go"
                            target="_blank"
                            rel="noreferrer">
                            Github
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
