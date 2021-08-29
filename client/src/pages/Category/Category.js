import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import './category.css';


const Category = () => {
    let history = useHistory();

    const [cname, setCname] = useState('');
    const [date, setDate] = useState(Date.now);
    const [showaddform, setShowaddform] = useState(false);

    const [remark, setRemark] = useState('');
    const [price, setPrice] = useState();
    const [addcategory, setAddcategory] = useState('');
    const [categories, setCategories] = useState([]);
    let userId = JSON.parse(localStorage.getItem("userid"));


    useEffect(() => {
        console.log(userId);
        const fetchData = async () => {
            const { data } = await Axios.get(`/Category/`, { params: { userId: userId } });
            setCategories(data.result);
            console.log(data.result);
        }
        if (userId) fetchData();
    }, [userId]);

    const exploreCategory = (name) => {
        console.log(name);
        history.push(`/Category/${name}`);
    }

    const addCategory = async (e) => {
        const res = await Axios.post('/Category/addCategory', { userId: userId, name: cname, date: date });
        console.log(res);
    }

    const addExpense = (e) => {
        e.preventDefault();
        setShowaddform(true);
    }

    const addSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(userId, addcategory)
        const res = await Axios.post('/Category/Expense/addExpense', { userId: userId, price: price, remark: remark, date: Date.now, category: addcategory });
        console.log(res);
        setShowaddform(false);
    }

    return (
        <main>
            <section id="intro">
                {showaddform ?
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
                            placeholder="Enter any remark"
                            required
                            onChange={e => setAddcategory(e.target.value)}
                        />
                        <div style={{ display: 'flex' }}>
                            <button type='submit'>
                                Submit
                            </button>
                            <button onClick={() => setShowaddform(false)} style={{ marginLeft: 10 }}>
                                Back
                            </button>
                        </div>
                    </form>
                    :
                    <>
                        <h1>Category Page</h1>
                        <p>
                            <em>List of all category items.</em>
                        </p>
                        <form onSubmit={addCategory} className="Cform">
                            <label name="name">Category name</label>
                            <input
                                type='name'
                                name='cname'
                                value={cname}
                                placeholder="Enter your category"
                                required
                                onChange={e => setCname(e.target.value)}
                            />
                            <div style={{ display: 'flex' }}>
                                <button type="submit">
                                    Add Category
                                </button>
                                <button onClick={addExpense} style={{ marginLeft: 10 }}>
                                    Add Expense
                                </button>
                            </div>
                        </form>

                        <div className="categories">
                            {(categories.length > 0) ?
                                categories.map((category) => (
                                    <CategoryCard
                                        key={category._id}
                                        name={category.name}
                                        date={category.date}
                                        exploreCategory={exploreCategory}
                                    />
                                ))
                                : null
                            }
                        </div>
                    </>
                }
            </section>
        </main>
    )
}

export default Category;