const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
const cors = require('cors');
const passport = require('passport')
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
mongoose.connect('mongodb://localhost:27017/food-db')
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((e)=>{
        console.log(e)
    });

// seedDB();
// MiddleWare

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors(
    {
        origin:['http://localhost:3000'],
        credentials: true
    },
));

app.use(cookieParser("secretcode"));

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));




const foodRoutes = require('./api/foodRoutes');
const userRoutes = require('./api/userRoutes')
app.get("/hello", (req,res)=>{
    res.status(200).json({msg:'HELLO FROM THE SERVER'});
})

app.use(userRoutes);
app.use(foodRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})