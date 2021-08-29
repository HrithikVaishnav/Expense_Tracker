import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ExpenseCard from '../../components/ExpenseCard/ExpenseCard';

const Expense = (props) => {
    const [expenses, setExpenses] = useState([]);
    let userId = JSON.parse(localStorage.getItem("userid"));
    console.log(props.match.params);
    const id = props.match.params.id;
    console.log(id);
    console.log("abc");

    useEffect(() => {
        console.log(userId);
        const fetchData = async () => {
            const { data } = await Axios.get(`/Category/Expense/`, { params:{
                userId:userId,
                category: id
            } });
            setExpenses(data.result || []);
            console.log(data.result);
        }
        if (id) fetchData();
    }, [id, userId]);
    
    
    return (
        <main>
            <div className="categories">
                {(expenses.length > 0) ?
                    expenses.map((e) => (
                        <ExpenseCard
                            name={e.name}
                            date={e.date}
                            price={e.price}
                            remark={e.remark}
                            key={e._id}
                        />
                    ))
                    : null
                }
            </div>
        </main>
    )
}

export default Expense;