const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  // You can add userId here if user authentication is implemented
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
