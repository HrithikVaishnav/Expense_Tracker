import React, { useState, useEffect } from 'react';
import Axios from 'react';

const Expense = (props) => {
    const [expenses, setExpenses] = useState([]);
    let userId = JSON.parse(localStorage.getItem("userid"));
    const Category = this.props.match.params.id;

    useEffect(()=>{
        console.log(userId)
        if(userId){
            Axios.get(`/Category/Expense/`, {
                params:{
                    userId:userId,
                    category: Category
                }
            })
            .then(response => {
                setExpenses(response.data.result);
                console.log(expenses);
            }).catch(e => {
               console.log(e);
            })
        }
    },[]);
    
    return (
        <div>

        </div>
    )
}

export default Expense;