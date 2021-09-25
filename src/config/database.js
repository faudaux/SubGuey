const express = require("express");
const mongoose = require("mongoose");


require("dotenv").config();

const uri = process.env.MDB_LINK;



connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const ingredientSchema = new mongoose.Schema({
    name: String,
    price: Number,
    type: String
});

const Ingredient = connection.model("Ingredient", ingredientSchema);

const orderSchema = new mongoose.Schema({
    orden: [String],
    price: Number
})

const Order = connection.model("Order", orderSchema);


module.exports = connection;
module.exports.Ingredient = Ingredient;
module.exports.Order = Order;