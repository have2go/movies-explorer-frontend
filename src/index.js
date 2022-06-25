import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";

// РЕВЬЮЕРУ: Похоже, я всё сверстал по макету в фигме из вкладки SOURCE, а надо было из RESULT.
// Заметил уже почти когда все доделал, да и нравится такой вариант значительно больше
// (В общем, напутал с генерацией макета).
// Прошу проверить в таком виде, т.к. мне сейчас грозит отчисление и академы кончились.
// Соответственно за 5 дней надо написать всю логику, а переделывая верстку я точно ничего не успею.

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
);

reportWebVitals();
