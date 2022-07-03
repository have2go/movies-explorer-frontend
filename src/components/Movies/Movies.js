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
    const [loadingError, setLoadingError] = useState("");
    const [isNotFound, setIsNotFound] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [initialMovies, setInitialMovies] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const moviesArr = JSON.parse(localStorage.getItem("movies"));
        const filteredArr = JSON.parse(
            localStorage.getItem("filteredMovies")
        );
        if (filteredArr) {
            setFilteredMovies(filteredArr);
        }
        
        if (moviesArr && location.pathname === "/movies") {
            setMovies(moviesArr);
        } else {
            setMovies([]);
            setIsLoading(true);
        }
        setLoadingError(false);
        MoviesApi.getMovies()
            .then((moviesArr) => {
                setInitialMovies(moviesArr);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setLoadingError(true);
            });

        const checkbox = JSON.parse(localStorage.getItem("checkbox"));
        if (checkbox) {
            setIsCheckboxOn(true);
        }
    }, []);

    function handleSearch(text) {
        setMovies([]);
        setIsNotFound(false);
        setLoadingError(false);
        setIsLoading(true);
        setMovies(sortMovies(initialMovies, text));
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
        localStorage.setItem("inputText", JSON.stringify(text));
        localStorage.setItem("movies", JSON.stringify(result));

        if (result.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }

        setIsLoading(false);

        return result;
    }

    function checkMatch(name, text) {
        return name
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(text.toLowerCase().split(" ").join(""));
    }

    function handleFilterChange() {
        if (movies.length !== 0) {
            !isCheckboxOn ? handleFilteredMovies() : setMovies(movies);
            setIsCheckboxOn(!isCheckboxOn);
        } else {
            setIsCheckboxOn(!isCheckboxOn);
        }
        localStorage.setItem("checkbox", JSON.stringify(!isCheckboxOn));
    }

    function handleFilteredMovies() {
        setFilteredMovies(filterMovies(movies));
        localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    }

    function filterMovies(array) {
        return array.filter((movie) => {
            return movie.duration <= 40;
        });
    }
    // console.log(movies, filteredMovies)

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
