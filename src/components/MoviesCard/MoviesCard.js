import React, { useState } from "react";

import "./MoviesCard.css";

function MoviesCard({ handleSaveMovie, handleDeleteMovie, card, location }) {
    const localSaved = JSON.parse(localStorage.getItem("savedMovies"));

    const isFilmSaved = localSaved.some((savedMovie) => {
        return card.id === savedMovie.movieId;
    });
    
    const [isSaved, setIsSaved] = useState(isFilmSaved ? true : false);

    function handleSave() {
        handleSaveMovie(card);
        setIsSaved(!isSaved);
    }

    function handleDelete() {
        handleDeleteMovie(card);
        setIsSaved(!isSaved);
    }

    function handleDeleteSavedMovie() {
        handleDelete();
    }

    function handleDuration(duration) {
        const hours = Math.trunc(duration / 60);
        const minutes = duration % 60;
        return `${hours > 0 ? `${hours}ч` : ""} ${minutes}м`;
    }

    return (
        <div className="card">
            <img
                className="card__image"
                src={
                    location.pathname === "/movies"
                        ? `https://api.nomoreparties.co${card.image.url}`
                        : card.image
                }
                alt={card.nameRU}
            />
            {location.pathname === "/movies" ? (
                <button
                    className={`card__save-btn ${
                        isSaved ? "card__save-btn_active" : ""
                    }`}
                    type="button"
                    onClick={!isSaved ? handleSave : handleDelete}></button>
            ) : (
                <button
                    className="card__remove-btn"
                    type="button"
                    onClick={handleDeleteSavedMovie}></button>
            )}
            <a href={card.trailerLink} target="_blank" rel="noreferrer">
                <div className="card__image-cover"></div>
            </a>
            <div className="card__info">
                <div className="card__content">
                    <p className="card__title">{card.nameRU}</p>
                    <p className="card__duration">{handleDuration(card.duration)}</p>
                </div>
            </div>
        </div>
    );
}

export default MoviesCard;
