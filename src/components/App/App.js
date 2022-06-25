import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
// import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";

import "./App.css";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <div className="page">
                <Switch>
                    <Route exact path="/">
                        <Main location={location.pathname} />
                    </Route>
                    <Route path="/movies">
                        <Movies location={location.pathname} />
                    </Route>
                    <Route path="/saved-movies">
                        <SavedMovies location={location.pathname} />
                    </Route>
                    <Route path="/profile">
                        <Profile location={location.pathname} />
                    </Route>
                    <Route path="/signup">
                        <Register />
                    </Route>
                    <Route path="/signin">
                        <Login />
                    </Route>
                    {/* роуты для тестов */}
                    <Route path="/404">
                        <NotFound />
                    </Route>
                    <Route path="/preloader">
                        <Preloader />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
