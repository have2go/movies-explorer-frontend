import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../../utils/ProtectedRoute";

import * as Api from "../../utils/MainApi";

import "./App.css";

function App() {
    const location = useLocation();
    const history = useHistory();

    const [signupError, setSignupError] = useState(false);
    const [signinError, setSigninError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isUserUpdated, setIsUserUpdated] = useState(false);
    const [isUserUpdateFailed, setIsUserUpdateFailed] = useState(false);
    const [localSavedMovies, setLocalSavedMovies] = useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

    function handleRegister(name, email, password) {
        Api.register(name, email, password)
            .then((res) => {
                setSignupError(false);
                handleLogin(email, password);
            })
            .catch((err) => {
                setSignupError(true);
                if (err.status === 400) {
                    console.log("400 - некорректно заполнено одно из полей");
                }
            });
    }

    function handleSignOut() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("movies");
        localStorage.removeItem("inputText");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("savedMoviesInputText");
        localStorage.removeItem("checkbox");
        localStorage.removeItem("filteredMovies");
        localStorage.removeItem("checkboxSaved");
        localStorage.removeItem("filteredSavedMovies");
        setLoggedIn(false);
        history.push("/");
    }

    function getUserInfo() {
        Api.getUserInfo()
            .then((res) => {
                setCurrentUser({
                    name: res.name,
                    email: res.email,
                    _id: res._id,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleLogin(email, password) {
        Api.login(email, password)
            .then((res) => {
                setSigninError(false);
                Api.setToken(`Bearer ${res.token}`);
                setLoggedIn(true);
                getUserInfo();
                history.push("/movies");
            })
            .catch((err) => {
                setSigninError(true);
                if (err.status === 400) {
                    console.log("400 - не передано одно из полей");
                } else if (err.status === 401) {
                    console.log("401 - пользователь с email не найден");
                }
            });
    }

    function handleUpdateUserInfo(name, email) {
        Api.updateUserInfo(name, email)
            .then((res) => {
                setCurrentUser({
                    name: res.name,
                    email: res.email,
                    _id: res._id,
                });
                setIsUserUpdated(true);
            })
            .catch((err) => {
                console.log(err);
                setIsUserUpdateFailed(true);
            });
    }

    function handleSaveMovie(movie) {
        Api.saveMovie(movie)
            .then((savedMovie) => {
                const localSaved = JSON.parse(
                    localStorage.getItem("savedMovies")
                );
                const newLocalSaved = [savedMovie, ...localSaved];
                setLocalSavedMovies(newLocalSaved);
                localStorage.setItem(
                    "savedMovies",
                    JSON.stringify(newLocalSaved)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDeleteMovie(movie) {
        const savedMoviesArr = JSON.parse(localStorage.getItem("savedMovies"));
        const movieToDelete = savedMoviesArr.find((savedMovie) =>
            savedMovie.movieId === movie.movieId ? movie.movieId : movie.id
        );

        Api.deleteMovie(movieToDelete._id)
            .then((res) => {
                const localSaved = JSON.parse(
                    localStorage.getItem("savedMovies")
                );
                const newLocalSaved = localSaved.filter(
                    (localMovie) => localMovie.movieId !== movieToDelete.movieId
                );
                const newLocalSavedFiltered = newLocalSaved.filter((movie) => {
                    return movie.duration <= 40;
                })
                setLocalSavedMovies(newLocalSaved);
                setFilteredSavedMovies(newLocalSavedFiltered);
                localStorage.setItem(
                    "savedMovies",
                    JSON.stringify(newLocalSaved)
                );
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        const path = location.pathname;
        if (jwt) {
            Api.checkToken(jwt)
                .then((res) => {
                    setLoggedIn(true);
                    getUserInfo();
                    history.push(path);
                })
                .catch((err) => {
                    if (err.status === 401) {
                        console.log(
                            "401 — Токен не передан или передан не в том формате"
                        );
                    }
                    console.log(err);
                });
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            Api.getMovies()
                .then((res) => {
                    const thisOwnersMovies = res.filter(
                        (movie) => movie.owner === currentUser._id
                    );
                    localStorage.setItem("savedMovies", JSON.stringify(thisOwnersMovies));
                    setLocalSavedMovies(thisOwnersMovies);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn, currentUser._id]);

    useEffect(() => {
        setIsUserUpdated(false);
        setIsUserUpdateFailed(false);
    }, [location])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Switch>
                        <Route exact path="/">
                            <Main
                                loggedIn={loggedIn}
                                location={location.pathname}
                            />
                        </Route>
                        <ProtectedRoute
                            exact
                            path="/movies"
                            loggedIn={loggedIn}
                            component={Movies}
                            location={location.pathname}
                            handleSaveMovie={handleSaveMovie}
                            handleDeleteMovie={handleDeleteMovie}
                        />
                        <ProtectedRoute
                            exact
                            path="/saved-movies"
                            loggedIn={loggedIn}
                            component={SavedMovies}
                            location={location.pathname}
                            handleDeleteMovie={handleDeleteMovie}
                            localSavedMovies={localSavedMovies}
                            setLocalSavedMovies={setLocalSavedMovies}
                            filteredSavedMovies={filteredSavedMovies}
                            setFilteredSavedMovies={setFilteredSavedMovies}
                        />
                        <ProtectedRoute
                            exact
                            path="/profile"
                            loggedIn={loggedIn}
                            component={Profile}
                            onSignOut={handleSignOut}
                            currentUser={currentUser}
                            onUpdate={handleUpdateUserInfo}
                            isUpdated={isUserUpdated}
                            isUpdateFailed={isUserUpdateFailed}
                        />
                        <Route path="/signup">
                            <Register
                                error={signupError}
                                onSubmit={handleRegister}
                            />
                        </Route>
                        <Route path="/signin">
                            <Login error={signinError} onSubmit={handleLogin} />
                        </Route>
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
