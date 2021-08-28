const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require("../models/User");
const router = express.Router();

router.post('/signup', async(req,res) =>{
    const {email, password} = req.body;
    console.log("hereererere");

    try{
        const user = new User({email, password});
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.secret);
        res.send({ token });
    } catch (err){
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async(req,res)=> {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(422).send({email: ' Must provide inputs'});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(422).send({error: ' Invalid email or password '});
    }

    try{
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, process.env.secret);
        res.send({ token });
    }catch(err){
        return res.status(422).send({error: ' Invalid email or password '});
    }
})

module.exports = router;