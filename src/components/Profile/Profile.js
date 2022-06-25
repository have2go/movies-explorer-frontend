import React from "react";
import Header from "../Header/Header";

import "./Profile.css";

function Profile(props) {
    return (
        <>
            <Header location={props.location} />
            <section className="profile">
                <h1 className="profile__greeting">Привет, Алексей!</h1>
                <div className="profile__container">
                    <p className="profile__input-name">Имя</p>
                    <input className="profile__input"/>
                </div>
                <div className="profile__container">
                    <p className="profile__input-name">E-mail</p>
                    <input className="profile__input"/>
                </div>
                <button className="profile__edit-btn" type="button">Редактировать</button>
                <button className="profile__logout-btn" type="button">Выйти из аккаунта</button>
            </section>
        </>
    );
}

export default Profile;