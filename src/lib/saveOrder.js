const mongoose = require("mongoose");
const connection = require("../config/database");

const saveOrder = (items) => {

    let orderPrice = 0;

    const addEverything = (item) => {
        const thisIngredient = connection.Ingredient.findOne({
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
    
    
    
    const loop = async () => {
        for (var i = 0; i < items.length; i++) {
        let newIngredient = await addEverything(items[i])
        orderPrice += newIngredient.price;
    
        }
    
        let newOrder = new connection.Order({
        orden: items,
        price: orderPrice
        });
    
        newOrder.save();
    }

    
    loop();

}


module.exports =saveOrder;