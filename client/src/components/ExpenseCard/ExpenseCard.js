import React from 'react';

const ExpenseCard = ({ name, key, date, price, remark, ...props }) => {

    return (
        <div style={{height: 'max-content'}} className="CCard" key={props.key}>
            <div className="title">
                {name}
            </div>
            <div className="Date">
                {date}
            </div>
            <div className="title">
                {price}
            </div>
            <div className="title">
                {remark}
            </div>
        </div>
    )
}

export default ExpenseCard;