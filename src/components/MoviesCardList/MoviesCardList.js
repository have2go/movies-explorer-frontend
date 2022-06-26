import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { testArr } from "../../utils/constants";

import "./MoviesCardList.css";
import ShowMore from "../ShowMore/ShowMore";

function MoviesCardList({ location }) {
    return (
        <>
            <section className="card-list">
                {testArr.map((card) => (
                    <MoviesCard
                        key={card._id}
                        title={card.title}
                        duration={card.duration}
                        src={card.src}
                        location={location}
                    />
                ))}
            </section>
            {location === "movies" ? <ShowMore /> : ""}
        </>
    );
}

export default MoviesCardList;
