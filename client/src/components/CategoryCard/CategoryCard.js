import React from 'react';
import './style.css';

const CategoryCard = (props) => {
    const bgColour = props.bgColour;
    
    return (
        <div style={{backgroundColor: `#${bgColour}`}} className="CCard">
            <div className="title">
                Title
            </div>
            <div className="Date">
                Date of created
            </div>
        </div>
    )
}

export default CategoryCard;