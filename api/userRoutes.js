const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs');
router.post('/login', (req,res)=>{
    console.log(req.body);
})
router.post("/register", (req,res)=>{
    const {username, password} = {...req.body};
    User.findOne({username: username}, async (err, doc)=>{
        if(err) throw err;
        if(doc) res.send("User already exists");
        if(!doc){
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = new User({
                username: username,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("User Created");
        }
    })
})
router.get("/user", (req,res)=>{})


module.exports = router;