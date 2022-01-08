const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((e)=>{
        console.log(e)
    });

// seedDB();
// MiddleWare
app.use(express.json());
app.use(cors(
    {
        methods: ['GET', 'POST'],
        origin: ['http://localhost:3000', 'https://adoring-blackwell-5a0e2e.netlify.app'],
        credentials:true
    },
))

const sessionConfig = {
    secret:'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user,cb)=>{
    cb(null, user);
});
passport.deserializeUser((id,cb)=>{
    User.findOne({_id: id}, (err,user)=>{
        cb(err, user);
    })
});

const foodRoutes = require('./api/foodRoutes');
const authRoutes = require('./api/authRoutes');

app.get('/hello', (req, res) => {
    res.status(200).json({msg:'Hello from the server'})
})


app.use(foodRoutes);
app.use(authRoutes);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server running at ${port}`)
})