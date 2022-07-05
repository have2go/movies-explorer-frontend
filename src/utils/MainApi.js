import { api_url } from "./constants";
// const devUrl = "http://localhost:3001";

function resolveCheck(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getMovies = () => {
    return fetch(api_url + "/movies", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.jwt,
        },
    }).then(resolveCheck);
}

export const getUserInfo = () => {
    return fetch(api_url + "/users/me", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.jwt,
        },
    }).then(resolveCheck);
};

export const register = (name, email, password) => {
    return fetch(api_url + "/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    }).then(resolveCheck);
};

export const login = (email, password) => {
    return fetch(api_url + "/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(resolveCheck)
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                return data;
            }
        });
};

export const updateUserInfo = (name, email) => {
    return fetch(api_url + "/users/me", {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.jwt,
        },
        body: JSON.stringify({
            name: name,
            email: email,
        }),
    }).then(resolveCheck);
};

export const saveMovie = (card) => {
    return fetch(api_url + "/movies", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.jwt,
        },
        body: JSON.stringify({
                  country: card.country || "NoCountry",
                  director: card.director,
                  duration: card.duration,
                  year: card.year,
                  description: card.description,
                  image: `https://api.nomoreparties.co${card.image.url}`,
                  trailerLink: card.trailerLink || "https://www.youtube.com/",
                  nameRU: card.nameRU,
                  nameEN: card.nameEN || "NoName",
                  thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
                  movieId: card.id,
              }),
    }).then(resolveCheck);
};

export const deleteMovie = (movieId) => {
    return fetch(api_url + `/movies/${movieId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.jwt,
        },
        body: JSON.stringify({
            _id: movieId,
        }),
    }).then(resolveCheck);
}

export const checkToken = (jwt) => {
    return fetch(api_url + "/users/me", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: jwt,
        },
    }).then(resolveCheck);
};

export const setToken = (token) => {
    localStorage.setItem("jwt", token);
};
