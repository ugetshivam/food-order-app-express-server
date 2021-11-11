const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Food = require('../models/food');

router.get('/allfoods', async (req,res)=>{
    try {
        const allfoods = await Food.find({});
        res.status(200).json(allfoods);
    }
    catch(e) {
        res.status(404).json({msg:"Cannot fetch the food items right now"});
    }
})

router.post('/login', (req,res)=>{
    console.log(req.body);
})
router.post("/register", (req,res)=>{
    console.log(req.body);
})
router.get("/user", (req,res)=>{})

module.exports = router;