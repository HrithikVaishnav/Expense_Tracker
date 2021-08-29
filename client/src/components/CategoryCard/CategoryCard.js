import React from 'react';
import './style.css';

const CategoryCard = ({ name, key, date, ...props }) => {
    const bgColour = Math.floor(Math.random() * 16777215).toString(16);

    return (
        <div className="CCard" key={props.key}>
            <div className="title">
                {name}
            </div>
            <div className="Date">
                {date}
            </div>
            <button type="button" onClick={()=>props.exploreCategory(name)}>
                Explore
            </button>
        </div>
    )
}

export default CategoryCard;