import { moviesApi_url } from "./constants";

function resolveCheck(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getMovies = () => {
    return fetch(moviesApi_url, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then(resolveCheck);
}