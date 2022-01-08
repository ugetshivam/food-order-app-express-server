const { json } = require('express');
const express = require('express');
const passport = require('passport');
const { rawListeners } = require('../models/user');
const router = express.Router();
const User = require('../models/user')

// Register new user
router.post('/register', async (req,res)=>{
    try{
    const {username, password, email} = req.body;
    const user = new User({
        username: username,
        email: email
    });
    await User.register(user, password);
    res.status(200).json({msg: "User added"})
}
    catch (e) {
        res.status(404).json({ msg: "User couldnt be added" })
    }

})

// Login the User
router.post('/login', (req,res, next)=>{
passport.authenticate('local', (err,user,info)=>{
    if(err) throw err;
    if(!user) res.status(404).json({msg:"No user exists"})
    else{
        req.logIn(user, err =>{
            if(err) throw err;
            res.status(200).json({msg: "User logged in successfully"})
            console.log(req.user.username);
        })
    }
})(req,res,next);
});

router.get('/logout', (req,res)=>{
    req.logout();
    res.status(200).json({msg:"Logged out!"})
});

router.get('/getuser', (req,res)=>{
    if(req.user){
        const {username} = req.user;
        console.log(username);
        res.status(200).json({user:username});
    }
});
module.exports = router;