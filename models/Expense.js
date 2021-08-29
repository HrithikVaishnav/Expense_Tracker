const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price:{
        type: Number,
        default: 0,
    },
    remark:{
        type: String,
        default:''
    },
    date:{
        type: Date, 
        default: Date.now 
    },
    category: { 
        name: String,
        default: ''
    },
})

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;