import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

function SearchForm() {
    function handleChange(e) {
        e.preventDefault();
        e.target.classList.toggle("filter-checkbox__btn_active");
    }

    return (
        <section className="search-form">
            <div className="search-form__container">
                <input className="search-form__input" placeholder="Фильм" />
                <button className="search-form__button"></button>
            </div>
            <FilterCheckbox onClick={handleChange} />
        </section>
    );
}

export default SearchForm;
