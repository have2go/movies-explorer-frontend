import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ShowMore from "../ShowMore/ShowMore";

import "./MoviesCardList.css";

function MoviesCardList({
    movies,
    location,
    handleSaveMovie,
    handleDeleteMovie,
    savedMovies,
    isLoading,
    isNotFound,
    loadingError,
}) {
    const [currentAmount, setCurrentAmount] = useState(0);
    const [extraRow, setExtraRow] = useState(3);
    const [moviesToRender, setMoviesToRender] = useState([]);

    const getCount = (windowSize) => {
        if (windowSize >= 931) {
            return { init: 12, more: 3 };
        }
        if (windowSize > 480 && windowSize <= 768) {
            return { init: 8, more: 2 };
        }
        return { init: 5, more: 2 };
    };

    useEffect(() => {
        const windowSize = window.innerWidth;
        setExtraRow(getCount(windowSize).more);
        const count = Math.min(movies.length, getCount(windowSize).init);
        setMoviesToRender(movies.slice(0, count));
        setCurrentAmount(count);
    }, [movies]);

    const getExtraRow = () => {
        const amount = Math.min(movies.length, currentAmount + extraRow);
        const extraMovies = movies.slice(currentAmount, amount);
        setMoviesToRender([...moviesToRender, ...extraMovies]);
        setCurrentAmount(amount);
    };

    const resizeHandler = () => {
        const windowSize = window.innerWidth;
        setExtraRow(getCount(windowSize));
    };

    useEffect(() => {
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <>
            <section className="card-list">
                {(location.pathname === "/movies" ? moviesToRender : movies).map((card) => (
                    <MoviesCard
                        card={card}
                        key={card.id || card.movieId}
                        location={location}
                        handleSaveMovie={handleSaveMovie}
                        handleDeleteMovie={handleDeleteMovie}
                        savedMovies={savedMovies}
                    />
                ))}
            </section>
            <div className="loading">
                {isLoading ? <Preloader /> : ""}
                {isNotFound && <span>Ничего не найдено</span>}
                {loadingError && (
                    <span>
                        "Во время запроса произошла ошибка. Возможно, проблема с
                        соединением или сервер недоступен. Подождите немного и
                        попробуйте ещё раз"
                    </span>
                )}
            </div>
            {location.pathname === "/movies" && currentAmount < movies.length && (
                <ShowMore onClick={getExtraRow} />
            )}
        </>
    );
}

export default MoviesCardList;
