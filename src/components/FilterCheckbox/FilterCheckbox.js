import React from "react";

import "./FilterCheckbox.css";

function FilterCheckbox(props) {
    return (
        <div className="filter-checkbox">
            <button
                className={`filter-checkbox__btn ${props.isCheckboxOn ? "filter-checkbox__btn_active" : ""}`}
                onClick={props.onClick} type="button"></button>
            <p className="filter-checkbox__text">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;
