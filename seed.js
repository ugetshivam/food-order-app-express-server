const mongoose = require('mongoose');
const Food = require('./models/food');

const dummyFoodItems = [
    {
        name: "Ham Burger",
        price: 150,
        desc: "Toasted buns with a juicy beef patty in between"
    },
    {
        name: "Margherita Pizza",
        price: 375,
        desc: "Classsic Margherita Pizza loaded with cheese"
    },
    {
        name: "Mutton Korma",
        price: 425,
        desc: "Tender Mutton with a spicy gravy"
    },
    {
        name: "Butter Naan",
        price: 60,
        desc: "Maida Bread made in a tandoor"
    }
];

const seedDB = async ()=>{
    await Food.deleteMany({});
    await Food.insertMany(dummyFoodItems);
    console.log("DB Seeded");
}

module.exports = seedDB;