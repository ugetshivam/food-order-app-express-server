const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
const cors = require('cors');
mongoose.connect('mongodb://localhost:27017/food-db')
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((e)=>{
        console.log(e)
    });

// seedDB();

app.use(cors(
    {
        origin:['http://localhost:3000'],
        credentials: true
    },
));

const foodRoutes = require('./api/foodRoutes');

app.get("/hello", (req,res)=>{
    res.status(200).json({msg:'HELLO FROM THE SERVER'});
})


app.use(foodRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})