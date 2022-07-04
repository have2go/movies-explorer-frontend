import React, { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./SavedMovies.css";

function SavedMovies({
    loggedIn,
    handleDeleteMovie,
    location,
    localSavedMovies,
    setLocalSavedMovies,
    filteredSavedMovies,
    setFilteredSavedMovies,
}) {
    const [isCheckboxOn, setIsCheckboxOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState("");
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        setLocalSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
    }, [])

    function handleSearch(text) {
        setLocalSavedMovies([]);
        setIsNotFound(false);
        setLoadingError(false);
        setIsLoading(true);
        const savedMoviesArr = JSON.parse(localStorage.getItem("savedMovies"));
        sortMovies(savedMoviesArr, text);
    }

    function sortMovies(movies, text) {
        const result = movies.filter((movieObj) => {
            const { nameRU, nameEN } = movieObj;

            const isFilm =
                (nameRU !== null && checkMatch(nameRU, text)) ||
                (nameEN !== null && checkMatch(nameEN, text));
            return isFilm;
        });

        if (result.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }

        setIsLoading(false);
        setLocalSavedMovies(result);
        setFilteredSavedMovies(filterMovies(result))
    }

    function checkMatch(name, text) {
        return name
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(text.toLowerCase().split(" ").join(""));
    }

    function handleFilterChange() {
        setIsCheckboxOn(!isCheckboxOn);
    }

    function filterMovies(array) {
        return array.filter((movie) => {
            return movie.duration <= 40;
        });
    }

    return (
        <>
            <Header loggedIn={loggedIn} />
            <section className="saved-movies">
                <SearchForm
                    onSearch={handleSearch}
                    isCheckboxOn={isCheckboxOn}
                    handleFilterChange={handleFilterChange}
                    location={location}
                />
                <MoviesCardList
                    movies={isCheckboxOn ? filteredSavedMovies : localSavedMovies}
                    location={location}
                    isLoading={isLoading}
                    isNotFound={isNotFound}
                    loadingError={loadingError}
                    handleDeleteMovie={handleDeleteMovie}
                />
            </section>
            <Footer />
        </>
    );
}

export default SavedMovies;
