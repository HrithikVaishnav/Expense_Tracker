const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Category = require("../models/Category");
const router = express.Router();

router.get('/', async(req,res) => {
    let userId = req.query.userId
    
    console.log(userId);
    Category.find({"userId":userId})
    .then((result) => {
        console.log(result, "result here");
        const token = jwt.sign({ userId }, process.env.secret);
        res.send({ token, result });
    })
    .catch((err) => {
        console.log(err);
    });
})


router.post('/addCategory', async(req,res) => {
    const {
        userId,
        name,
        date,
    } = req.body;
    console.log("hii");
    try{
        const category = new Category({
            userId,
            name,
            date,
        });
        await category.save();

        const token = jwt.sign({ userId }, process.env.secret);
        res.send({ token });
    } catch (err){
        return res.status(422).send(err.message);
    }
})

module.exports = router;