import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import * as MoviesApi from "../../utils/MoviesApi";

import "./Movies.css";

function Movies({ loggedIn, handleSaveMovie, handleDeleteMovie, location }) {
    const [isCheckboxOn, setIsCheckboxOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isSearched, setIsSearched] = useState(false);

    const [initialMovies, setInitialMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const moviesArr = JSON.parse(localStorage.getItem("movies"));
        const filteredArr = JSON.parse(localStorage.getItem("filteredMovies"));
        const checkbox = JSON.parse(localStorage.getItem("checkbox"));

        if (filteredArr) {
            setFilteredMovies(filteredArr);
        } else {
            setFilteredMovies([]);
        }

        if (moviesArr && location.pathname === "/movies") {
            setMovies(moviesArr);
        } else {
            setMovies([]);
        }

        if (checkbox) {
            setIsCheckboxOn(true);
        }
    }, []);

    function handleSearch(text) {
        setMovies([]);
        setFilteredMovies([]);
        setIsNotFound(false);
        setLoadingError(false);
        setIsLoading(true);
        if (!isSearched) {
            MoviesApi.getMovies()
                .then((moviesArr) => {
                    sortMovies(moviesArr, text);
                    setInitialMovies(moviesArr);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                    setLoadingError(true);
                });
        } else {
            sortMovies(initialMovies, text);
        }
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
        setIsSearched(true);

        const shortMovies = filterMovies(result);

        setMovies(result);
        setFilteredMovies(shortMovies);

        localStorage.setItem("inputText", JSON.stringify(text));
        localStorage.setItem("movies", JSON.stringify(result));
        localStorage.setItem("filteredMovies", JSON.stringify(shortMovies));
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
        localStorage.setItem("checkbox", JSON.stringify(!isCheckboxOn));
    }

    function filterMovies(array) {
        return array.filter((movie) => {
            return movie.duration <= 40;
        });
    }

    return (
        <>
            <Header loggedIn={loggedIn} />
            <section className="movies">
                <SearchForm
                    onSearch={handleSearch}
                    handleFilterChange={handleFilterChange}
                    isCheckboxOn={isCheckboxOn}
                    location={location}
                />
                <MoviesCardList
                    movies={isCheckboxOn ? filteredMovies : movies}
                    location={location}
                    isLoading={isLoading}
                    isNotFound={isNotFound}
                    loadingError={loadingError}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                />
            </section>
            <Footer />
        </>
    );
}

export default Movies;
