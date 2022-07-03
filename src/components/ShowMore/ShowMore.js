import React from "react";

import "./ShowMore.css";

function ShowMore(props) {
    return (
        <div className="show-more">
            <button className="show-more__btn" type="button" onClick={props.onClick}>Ещё</button>
        </div>
    );
}

export default ShowMore;