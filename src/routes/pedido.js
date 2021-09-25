const express = require("express");
const mongoose = require("mongoose");
const connection = require("../config/database");
const Ingredient = require("../config/database").Ingredient;
const saveOrder = require("../lib/saveOrder");
const router = express.Router();


router.route("/")
    .get((req, res) => {


    const types = ["Tortilla", "Carne", "Vegetal", "Salsa"];


    Ingredient.find({}, function(err, docs) {
      res.render("pedido.ejs", {
        ingredientes: docs,
        tipos: types,
      })
    })
        

})
    .post((req, res) =>{
        
        let items = []

        items.push(req.body.Tortillainput, req.body.Carneinput);
        items = items.concat(req.body.Vegetalinput, req.body.Salsainput);
        items = items.filter(Boolean);

        saveOrder(items);

        res.redirect("/pedido");
    });


    module.exports = router;