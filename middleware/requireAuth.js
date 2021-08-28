const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require("../models/User");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).send({error:' You are not logged in'});
    }

    const token = authorization;

    jwt.verify(token, process.env.secret, async(err, payload) =>{
        if(err) {
            return res.status(401).send({error:' You must enter valid details'});
        }
        console.log(payload);
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
}