import React from 'react';
import './card-list.styles.css'

const CardList = (props) => {
    return (
        <div className="movie-container d-grid gap-5 justify-content-center">
            {props.children}
        </div>
    )
}

export default CardList

