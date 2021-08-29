import React from 'react';
import './style.css';

const CategoryCard = (props) => {
    const bgColour = Math.floor(Math.random()*16777215).toString(16);
    // for random color style={{backgroundColor: `#${bgColour}`}} 
    const name = props.name;
    const key = props.key;
    const date = props.date;
    return (
        <div className="CCard">
            <div className="title">
                {name}
            </div>
            <div className="Date">
                {date}
            </div>
            <button
                type="button"
                className="btn"
                onClick={props.exploreCategory(key)}
            >
                Explore
            </button>
        </div>
    )
}

export default CategoryCard;