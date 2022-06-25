import React from "react";
import Logo from "../Logo/Logo";

import "./Form.css";

function Form(props) {
    return (
        <>
            <form className="form">
                <div className="form__content">
                    <Logo />
                    <h1 className="form__title">{props.title}</h1>
                    {props.type === "register" && (
                        <div className="form__container">
                            <p className="form__input-name">Имя</p>
                            <input className="form__input" type="text" />
                            <span className="form__span">Error</span>
                        </div>
                    )}
                    <div className="form__container">
                        <p className="form__input-name">E-mail</p>
                        <input className="form__input" type="email" />
                        <span className="form__span form__span_visible">
                            Error
                        </span>
                    </div>
                    <div className="form__container">
                        <p className="form__input-name">Пароль</p>
                        <input className="form__input" type="password" />
                        <span className="form__span">Error</span>
                    </div>
                </div>
                <div className="form__footer">
                    <button className="form__submit-btn" type="submit">
                        {props.type === "register"
                            ? "Зарегистрироваться"
                            : "Войти"}
                    </button>
                    <div className="form__underline">
                        {props.type === "register" ? (
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
