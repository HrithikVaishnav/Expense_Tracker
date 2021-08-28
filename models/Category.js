const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date, 
        default: Date.now 
    },
})

const Category = mongoose.model('Categary', categorySchema);
module.exports = Category;