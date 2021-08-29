import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import './category.css';

const Category = (props) => {

    console.log("in category", props);
   
    const [cname, setCname] = useState('');
    const [date, setDate] = useState(Date.now);
    //console.log(userId);
    const [categories, setCategories] = useState([]);
    let userId = JSON.parse(localStorage.getItem("userid"));
    useEffect(()=>{
        

        console.log(userId)
        if(userId){
            Axios.get(`/Category/`, {
                params:{
                    userId:userId
                }
            })
            .then(response => {
                setCategories(response.data.result);
                console.log(categories);
            }).catch(e => {
               console.log(e);
            })
        }
    },[]);

    const exploreCategory = (key) => {
        
    }

    const addCategory = () => {
        Axios.post('/Category/addCategory', {userId: userId, name: cname, date: date})
            .then((response) => {
                console.log(response);
            }).catch(e => {
                console.log(e);
        })
    }

    return (
        <div> 
            <h1>Category Page</h1>
            <form onSubmit={addCategory} className="Cform">
                <div>
                    <input
                        type='name'
                        name='cname'
                        value={cname}
                        placeholder="Enter your category"
                        required
                        onChange={e => setCname(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn"
                >
                    Add Category
                </button>
            </form>
            <div className="categories">
            {   
                (categories.length>0)?
                    categories.map((category) => (
                        <CategoryCard 
                            key={category._id}
                            name={category.name}
                            date={category.date}
                            exploreCategory={exploreCategory}
                        />
                    ))
                :null
            }
            </div>
        </div>
    )
}

export default Category;