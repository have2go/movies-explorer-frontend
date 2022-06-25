import React from "react";

import "./MoviesCard.css";
import testImg from "../../images/test-img.jpg";

function MoviesCard(props) {
    function handleLike(e) {
        e.preventDefault();
        e.target.classList.toggle("card__like-btn_active");
    }

    return (
        <div className="card">
            <img className="card__image" src={testImg} alt="test" />
            <div className="card__info">
                <div className="card__content">
                    <p className="card__title">{props.title}</p>
                    {props.location === "movies" ? (
                        <button
                            className="card__like-btn"
                            type="button"
                            onClick={handleLike}></button>
                    ) : (
                        <button
                            className="card__remove-btn"
                            type="button"></button>
                    )}
                </div>
                <p className="card__duration">{props.duration}</p>
            </div>
        </div>
    );
}

export default MoviesCard;
