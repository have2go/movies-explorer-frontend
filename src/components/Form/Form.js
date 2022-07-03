import React from "react";
import Logo from "../Logo/Logo";

import "./Form.css";

function Form({ validation, onSubmit, type, title, error }) {
    const { values, handleChange, errors, isValid, resetForm } = validation;

    return (
        <>
            <form className="form" onSubmit={onSubmit}>
                <div className="form__content">
                    <Logo />
                    <h1 className="form__title">{title}</h1>
                    {type === "register" && (
                        <div className="form__container">
                            <p className="form__input-name">Имя</p>
                            <input
                                className="form__input"
                                type="text"
                                name="name"
                                value={values.name || ""}
                                onChange={handleChange}
                                minLength="2"
                                maxLength="30"
                                required
                            />
                            <span className="form__span">{errors.name}</span>
                        </div>
                    )}
                    <div className="form__container">
                        <p className="form__input-name">E-mail</p>
                        <input
                            className="form__input"
                            type="email"
                            name="email"
                            value={values.email || ""}
                            onChange={handleChange}
                            required
                        />
                        <span className="form__span">{errors.email}</span>
                    </div>
                    <div className="form__container">
                        <p className="form__input-name">Пароль</p>
                        <input
                            className="form__input"
                            type="password"
                            name="password"
                            value={values.password || ""}
                            onChange={handleChange}
                            minLength="6"
                            required
                        />
                        <span className="form__span">{errors.password}</span>
                    </div>
                </div>
                <div className="form__footer">
                    <button
                        className={`form__submit-btn ${
                            !isValid && "form__submit-btn_disabled"
                        }`}
                        type="submit"
                        disabled={!isValid}>
                        {type === "register"
                            ? "Зарегистрироваться"
                            : "Войти"}
                    </button>
                    {error && <span className="form__error">При регистрации произошла ошибка</span>}
                    <div className="form__underline">
                        {type === "register" ? (
                            <>
                                <p className="form__question">
                                    Уже зарегистрированы?
                                </p>
                                <a href="/signin" className="form__link">
                                    Войти
                                </a>
                            </>
                        ) : (
                            <>
                                <p className="form__question">
                                    Ещё не зарегистрированы?
                                </p>
                                <a href="/signup" className="form__link">
                                    Регистрация
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </form>
        </>
    );
}

export default Form;
