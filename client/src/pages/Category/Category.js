import React from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import './category.css';

const Category = () => {
    return (
        <div> 
            <h1>Category Page</h1>
            <div className="categories">
                <CategoryCard bgColour={Math.floor(Math.random()*16777215).toString(16)}/>
                <CategoryCard bgColour={Math.floor(Math.random()*16777215).toString(16)}/>
                <CategoryCard bgColour={Math.floor(Math.random()*16777215).toString(16)}/>
            </div>
        </div>
    )
}

export default Category;