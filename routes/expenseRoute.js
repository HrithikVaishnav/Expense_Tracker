const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Expense = require("../models/Expense");
const router = express.Router();

router.get('/', async(req,res) => {
    const userId = req.query.userId;
    const category = req.query.category;
    Expense.find({userId : userId, name: category})
    .then((result) => {
        const token = jwt.sign({ userId }, process.env.secret);
        console.log(result);
        res.send({ token, result });
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
        name,
    } = req.body;
    console.log("hiii" , name);
    try{
        const expense = new Expense({
            userId,
            price,
            remark,
            date,
            name,
        });
        await expense.save();

        const token = jwt.sign({ userId }, process.env.secret);
        res.send({ token });
    } catch (err){
        return res.status(422).send(err.message);
    }
})

module.exports = router;