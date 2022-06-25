import React from "react";

import "./Techs.css";

function Techs() {
    return (
        <section className="techs" id="techs">
            <div className="techs__container">
                <h2 className="techs__title">Технологии</h2>
                <h3 className="techs__small-title">7 Технологий</h3>
                <p className="techs__paragraph">
                    На курсе веб-разработки мы освоили технологии, которые
                    применили в дипломном проекте.
                </p>
                <div className="techs__list">
                    <p className="techs__tech-name">HTML</p>
                    <p className="techs__tech-name">CSS</p>
                    <p className="techs__tech-name">JS</p>
                    <p className="techs__tech-name">React</p>
                    <p className="techs__tech-name">Git</p>
                    <p className="techs__tech-name">Express.js</p>
                    <p className="techs__tech-name">mongoDB</p>
                </div>
            </div>
        </section>
    );
}

export default Techs;
