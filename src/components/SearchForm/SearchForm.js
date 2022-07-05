import React, { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormAndValidation from "../../hooks/useFormAndValidation";

import "./SearchForm.css";

function SearchForm({ onSearch, isCheckboxOn, handleFilterChange, location }) {
    const { values, handleChange, setValues } = useFormAndValidation();

    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.text) {
            setError("Нужно ввести ключевое слово");
        } else {
            onSearch(values.text);
            // resetForm();
        }
    }

    useEffect(() => {
        const inputText = location.pathname === "/movies" ? JSON.parse(localStorage.getItem("inputText")) : JSON.parse(localStorage.getItem("savedMoviesInputText"));

        if (inputText) {
            setValues({ text: inputText });
        }
    }, [setValues, location.pathname]);

    useEffect(() => {
        if (values.text !== "") {
            setError("");
        }
    }, [values.text]);

    return (
        <form className="search-form" onSubmit={handleSubmit} noValidate>
            <div className="search-form__container">
                <input
                    className="search-form__input"
                    placeholder="Фильм"
                    type="text"
                    name="text"
                    value={values.text || ""}
                    onChange={handleChange}
                    required
                />
                <button className="search-form__button" type="submit">
                    Найти
                </button>
            </div>
            <span className="search-form__error">{error}</span>
            <FilterCheckbox
                onClick={handleFilterChange}
                isCheckboxOn={isCheckboxOn}
            />
        </form>
    );
}

export default SearchForm;
