import React from 'react';

import './FilterCheckbox.css';

function FilterCheckbox(props) {
    return (
        <div className='filter-checkbox'>
            <button className='filter-checkbox__btn' onClick={props.onClick}></button>
            <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;