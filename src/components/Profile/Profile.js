import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Profile.css";

function Profile({ loggedIn, onUpdate, isUpdated, isUpdateFailed, onSignOut }) {
    const { values, handleChange, isValid, setIsValid, setValues } =
        useFormAndValidation();
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setValues(currentUser);
        setIsValid(false);
    }, [currentUser, setValues, setIsValid]);

    function updateHandler(e) {
        e.preventDefault();
        onUpdate(values.name, values.email);
    }

    function handleEmailChange(e) {
        handleChange(e);

        e.target.value.match(
            /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i
        )
            ? setIsValid(true)
            : setIsValid(false);
    }

    return (
        <>
            <Header loggedIn={loggedIn} />
            <form className="profile" onSubmit={updateHandler}>
                <h1 className="profile__greeting">{`Привет, ${currentUser.name}!`}</h1>
                <div className="profile__container">
                    <p className="profile__input-name">Имя</p>
                    <input
                        className="profile__input"
                        type="text"
                        name="name"
                        value={values.name || ""}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="30"
                        required
                    />
                </div>
                <div className="profile__container">
                    <p className="profile__input-name">E-mail</p>
                    <input
                        className="profile__input"
                        type="email"
                        name="email"
                        value={values.email || ""}
                        onChange={handleEmailChange}
                    />
                </div>
                <span
                    className={`profile__upd-result ${
                        isUpdated || isUpdateFailed
                            ? "profile__upd-result_visible"
                            : ""
                    }`}>
                    {isUpdateFailed ? "Произошла ошибка" : "Данные изменены!"}
                </span>
                <button
                    className="profile__edit-btn"
                    type="submit"
                    disabled={
                        !isValid ||
                        (values.name === currentUser.name &&
                            values.email === currentUser.email)
                    }>
                    Редактировать
                </button>
                <button
                    onClick={onSignOut}
                    className="profile__logout-btn"
                    type="button">
                    Выйти из аккаунта
                </button>
            </form>
        </>
    );
}

export default Profile;
