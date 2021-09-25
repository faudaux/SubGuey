const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connection = require("./config/database");
const pedido = require("./routes/pedido")
const carrito = require("./routes/carrito")

require("dotenv").config();
require("ejs");


const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "../../public"));

app.use(express.urlencoded({
  extended: false
}));


app.use("/pedido", pedido);
app.use("/carrito", carrito);

app.get("/", function (req, res) {
  res.render("index", {});
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Escuchando en el puerto 3000");
});