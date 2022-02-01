const { Schema, model } = require('mongoose');

let productSchema = new Schema({
    productDetails: {type: String},
    productName: {type: String},
    price: {type: String},
    color: {type: String},
    category:{type: String},
    // isAvailable: {default: true},
    availableQuantity: {type: Number}
})

let productModel = model('productModel',productSchema);
module.exports = { productModel };