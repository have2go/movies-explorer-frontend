import React, { useState, useEffect, useContext } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./SavedMovies.css";

function SavedMovies({
    loggedIn,
    handleDeleteMovie,
    location,
    localSavedMovies,
    setLocalSavedMovies,
}) {
    const [isCheckboxOn, setIsCheckboxOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState("");
    const [isNotFound, setIsNotFound] = useState(false);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

    // const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        const filteredArr = JSON.parse(
            localStorage.getItem("filteredSavedMovies")
        );
        setFilteredSavedMovies(filteredArr);

        const checkbox = JSON.parse(localStorage.getItem("checkboxSaved"));
        if (checkbox) {
            setIsCheckboxOn(true);
        }
    }, [])

    function handleSearch(text) {
        setLocalSavedMovies([]);
        setIsNotFound(false);
        setLoadingError(false);
        setIsLoading(true);
        const savedMoviesArr = JSON.parse(localStorage.getItem("savedMovies"));
        // const thisOwnersMovies = savedMoviesArr.filter(
        //     (movie) => movie.owner === currentUser._id
        // );
        sortMovies(savedMoviesArr, text);
    }

    function sortMovies(movies, text) {
        const moviesToSort = isCheckboxOn
            ? movies.filter((movie) => {
                  return movie.duration <= 40;
              })
            : movies;

        const result = moviesToSort.filter((movieObj) => {
            const { nameRU, nameEN } = movieObj;

            const isFilm =
                (nameRU !== null && checkMatch(nameRU, text)) ||
                (nameEN !== null && checkMatch(nameEN, text));
            return isFilm;
        });
        localStorage.setItem("savedMoviesInputText", JSON.stringify(text));

        if (result.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }

        setIsLoading(false);
        setLocalSavedMovies(result);
    }

    function checkMatch(name, text) {
        return name
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(text.toLowerCase().split(" ").join(""));
    }

    function handleFilterChange() {
        if (localSavedMovies.length !== 0) {
            !isCheckboxOn ? handleFilteredMovies() : setLocalSavedMovies(localSavedMovies);
            setIsCheckboxOn(!isCheckboxOn);
        } else {
            setIsCheckboxOn(!isCheckboxOn);
        }
        localStorage.setItem("checkboxSaved", JSON.stringify(!isCheckboxOn));
    }

    function handleFilteredMovies() {
        setFilteredSavedMovies(filterMovies(localSavedMovies));
        localStorage.setItem("filteredSavedMovies", JSON.stringify(filteredSavedMovies));
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
