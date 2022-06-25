import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Movies.css";

function Movies(props) {
    return (
        <>
            <Header location={props.location} />
            <section className="movies">
                <SearchForm />
                <MoviesCardList location="movies" />
            </section>
            <Footer />
        </>
    );
}

export default Movies;
