import React from "react";

import "./MoviesCard.css";
import testImg from "../../images/test-img.jpg";

function MoviesCard(props) {
    function handleSave(e) {
        e.preventDefault();
        e.target.classList.toggle("card__save-btn_active");
    }

    return (
        <div className="card">
            <img
                className="card__image"
                src={testImg}
                alt="test"
            />
            <div className="card__image-cover">
                {props.location === "movies" ? (
                    <button
                        className="card__save-btn"
                        type="button"
                        onClick={handleSave}></button>
                ) : (
                    <button className="card__remove-btn" type="button"></button>
                )}
            </div>
            <div className="card__info">
                <div className="card__content">
                    <p className="card__title">{props.title}</p>
                    <p className="card__duration">{props.duration}</p>
                </div>
            </div>
        </div>
    );
}

export default MoviesCard;
