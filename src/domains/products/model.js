const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  description: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  imageUrl: {
    type: Object,
    required: true,
  },
  promo_code: {
    type: String,
  },
});
const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
