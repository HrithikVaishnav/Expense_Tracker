import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import './category.css';

const Category = (props) => {
    let history = useHistory();

    console.log("in category", props);
   
    const [cname, setCname] = useState('');
    const [date, setDate] = useState(Date.now);
    const [showaddform, setShowaddform] = useState(false);

    const [remark, setRemark] = useState('');
    const [price, setPrice] = useState();
    const [addcategory, setAddcategory] = useState('');
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

    const exploreCategory = (name) => {
        console.log(name);
        history.push(`/Category/${name}`);
    }

    const addCategory = () => {
        Axios.post('/Category/addCategory', {userId: userId, name: cname, date: date})
            .then((response) => {
                console.log(response);
            }).catch(e => {
                console.log(e);
        })
    }

    const addExpense = () => {
        setShowaddform(true);
    }

    const addSubmitHandler = () => {
        console.log(addCategory);
        Axios.post('/Category/Expense/addExpense', {userId: userId, price: price, remark: remark, date: Date.now, category: addcategory})
            .then((response) => {
                console.log(response);
                setShowaddform(false);
            }).catch(e => {
                console.log(e);
        })
    }

    return (
        <div> 
            {
            (showaddform)
            ?
            <>
            <form className="addform" onSubmit={addSubmitHandler}>
                <label name="name">Remark</label>
                <input
                    type='name'
                    name='remark'
                    value={remark}
                    placeholder="Enter any remark"
                    required
                    onChange={e => setRemark(e.target.value)}
                />

                <label name="name">Price</label>
                <input
                    type='number'
                    name='price'
                    value={price}
                    placeholder="Enter price"
                    required="required"
                    onChange={e => setPrice(e.target.value)}
                />

                <label name="name">Category</label>
                <input
                    type='name'
                    name='addcategory'
                    value={addcategory}
                    placeholder="Enter any category"
                    required
                    onChange={e => setAddcategory(e.target.value)}
                />
                <button type='submit'>
                    Submit
                </button>

            </form>
            </>
            :
            <>
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
            <button
                    type="submit"
                    className="btn"
                    onClick={addExpense}
            >
                Add Expense
            </button>
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
            </>
            }
        </div>
    )
}

export default Category;