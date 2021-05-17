const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


mongoose.connect('mongodb+srv://admin-fede:federico1@cluster0.deuos.mongodb.net/comidaRapida?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



const app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
  extended: false
}));

// COLECCION DE INGREDIENTES

const ingredientSchema = new mongoose.Schema({
  name: String,
  price: Number,
  type: String
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);


// COLECCION DE ORDERNES

const orderSchema = new mongoose.Schema({
  orden: [String],
  price: Number
})

const Order = mongoose.model("Order", orderSchema)

// const ingrediente = new Ingredient({
//   name: "Cerdo",
//   price: 7,
//   type: "Carne"
// })
//
// ingrediente.save(function(err, entry){
//   if(!err){
//     console.log(entry);
//   }
// });





// GET REQUESTS


app.get("/", function(req, res) {
  // MAIN PAGE
  res.render("index", {});
})




app.get("/pedido", function(req, res) {
  // PEDIDOS
  const types = ["Tortilla", "Carne", "Vegetal", "Salsa"];


    Ingredient.find({}, function(err, docs) {
      res.render("pedido.ejs", {
        ingredientes: docs,
        tipos: types,
      })
    })



});




app.get("/carrito", function(req, res) {
  // CARRITO
  var fullPrice = 0;

  Order.find({}, (err, docs) => {
    if(!err){
      docs.forEach((doc) => {
        fullPrice += doc.price
      })
      res.render("carrito.ejs", {compras: docs, precioCompleto: fullPrice});
    }
  })
})




// POST

app.post("/pedido", function(req, res) {
  // ORDENES
  let orderPrice = 0;
  let items = []

  // hacer el array de ingredientes

  items.push(req.body.Tortillainput, req.body.Carneinput);
  items = items.concat(req.body.Vegetalinput, req.body.Salsainput);

  items = items.filter(Boolean);



// funcion que devuelve un documento a partir del ingrediente pasado, y devuelve una promesa
  const addEverything = (item) => {
    const thisIngredient = Ingredient.findOne({
      name: item
    }, function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        return docs;
      }


    })
    return new Promise((resolve) => {
      resolve(thisIngredient)
    });
  }


  // fucion asincrónica que loopea sobre el array de items, llama a la funcion que busca un documento
  // , y suma todos los precios. Luego guarda un nuevo documento de la colección "Orders"

  const loop = async () => {
    console.log("Start");
    for (var i = 0; i < items.length; i++) {
      let newIngredient = await addEverything(items[i])
      orderPrice += newIngredient.price;

    }

    let newOrder = new Order({
      orden: items,
      price: orderPrice
    });

    newOrder.save();
  }

  loop();

  res.redirect("/pedido");

});

app.post("/delete", (req, res) => {
  let order = req.body.deletedList

  Order.findByIdAndDelete(order, function(err){
    if(err){
      console.log(err);
    } else{
      console.log("Success");
    }
  })


  res.redirect("/carrito")
})



app.listen(3000, function() {
  console.log("Escuchando en el puerto 3000");
});
