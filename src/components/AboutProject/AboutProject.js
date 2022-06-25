import React from "react";

import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="about" id="about">
            <div className="about__container">
                <h2 className="about__title">О проекте</h2>
                <div className="about__content">
                    <div className="about__text-block">
                        <h3 className="about__small-title">
                            Дипломный проект включал 5 этапов
                        </h3>
                        <p className="about__paragraph">
                            Составление плана, работу над бэкендом, вёрстку,
                            добавление функциональности и финальные доработки.
                        </p>
                    </div>
                    <div className="about__text-block">
                        <h3 className="about__small-title">
                            На выполнение диплома ушло 5 недель
                        </h3>
                        <p className="about__paragraph">
                            У каждого этапа был мягкий и жёсткий дедлайн,
                            которые нужно было соблюдать, чтобы успешно
                            защититься.
                        </p>
                    </div>
                </div>
                <div className="about__timeline">
                    <p className="about__weeks">1 неделя</p>
                    <p className="about__weeks">4 недели</p>
                    <p className="about__dev">Back-end</p>
                    <p className="about__dev">Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;
