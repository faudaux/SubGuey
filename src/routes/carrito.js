const express = require("express");
const mongoose = require("mongoose");
const Order = require("../config/database").Order;
const router = express.Router();


router.route("/")
  .get((req, res) => {
    var fullPrice = 0;

    Order.find({}, (err, docs) => {
      if (!err) {
        docs.forEach((doc) => {
          fullPrice += doc.price
        })
        res.render("carrito.ejs", {
          compras: docs,
          precioCompleto: fullPrice
        });
      }
    })
  })
  .post((req, res) => {
    let order = req.body.deletedList

    Order.findByIdAndDelete(order, function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/carrito")
    })
  });


module.exports = router;