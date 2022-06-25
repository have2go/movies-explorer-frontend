import React from 'react';

import './FilterCheckbox.css';

function FilterCheckbox(props) {
    return (
        <div className='filter-checkbox'>
            <p className='filter-checkbox__text'>Короткометражки</p>
            <button className='filter-checkbox__btn' onClick={props.onClick}></button>
        </div>
    );
}

export default FilterCheckbox;