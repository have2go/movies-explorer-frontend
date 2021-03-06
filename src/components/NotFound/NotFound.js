import React from "react";

import "./NotFound.css";

function NotFound({ history }) {
    function goToPrevious() {
        history.goBack();
    }

    return (
        <div className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <button className="not-found__btn" type="button" onClick={goToPrevious}>
                Назад
            </button>
        </div>
    );
}

export default NotFound;
