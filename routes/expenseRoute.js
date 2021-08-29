const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Expense = require("../models/Expense");
const router = express.Router();

router.get('/', async(req,res) => {
    const userId = req.body.userId;
    const category = req.body.category;
    Expense.find({userId : userId, category: category})
    .then((result) => {
        const token = jwt.sign({ userId }, process.env.secret);
        res.send({ token });
    })
    .catch((err) => {
        console.log(err);
    });
})

router.post('/addExpense', async(req,res) => {
    const {
        userId,
        price,
        remark,
        date,
        category,
    } = req.body;
    console.log("hiii" , category);
    try{
        const expense = new Expense({
            userId,
            price,
            remark,
            date,
            category
        });
        await expense.save();

        const token = jwt.sign({ userId }, process.env.secret);
        res.send({ token });
    } catch (err){
        return res.status(422).send(err.message);
    }
})

module.exports = router;