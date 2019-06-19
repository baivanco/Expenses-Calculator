const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
  product_name: {
    type: String,
    require: true
  },
  product_type: {
    type: String,
    require: true
  },
  product_description: {
    type: String,
    require: true
  },
  purchase_date: {
    type: String,
    require: true
  },
  product_price: {
    type: Number,
    require: true
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
