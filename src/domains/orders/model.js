const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customer: {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    division: {
      type: String,
    },
    phone: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
  },

  deliveryPlace: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    division: {
      type: String,
    },
  },

  products: {
    type: Object,
  },

  paymentMethod: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
