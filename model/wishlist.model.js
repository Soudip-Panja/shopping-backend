const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  // Add userId here if you support login
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
