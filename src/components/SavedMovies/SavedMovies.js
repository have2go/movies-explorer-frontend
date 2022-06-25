import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./SavedMovies.css";

function SavedMovies(props) {
    return (
        <>
            <Header location={props.location} />
            <section className="saved-movies">
                <SearchForm />
                <MoviesCardList location="saved-movies" />
            </section>
            <Footer />
        </>
        
    );
}

export default SavedMovies;
