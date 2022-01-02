const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/fakeuser', async (req, res)=>{
    const user = new User({
        username: 'sabeel',
        email: 'sabeel@gmail.com'
    });

   const newUser = await User.register(user, 'sabeel12');
   res.send(newUser);
})



module.exports = router;