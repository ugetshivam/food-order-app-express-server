const express = require('express');
const router = express.Router();
const User = require('../models/user')

// router.get('/fakeuser', async (req, res)=>{
//     const user = new User({
//         username: 'sabeel',
//         email: 'sabeel@gmail.com'
//     });

//    const newUser = await User.register(user, 'sabeel12');
//    res.send(newUser);
// })

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

module.exports = router;