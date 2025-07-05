const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
        required: true,
        enum: [
          "Men",
          "Women",
          "Kids",
          "Electronics",
          "Home",
          "Accessories",
          "Footwear",
          "Cosmetics",
        ],
      },
    ],
    description: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      required: true,
    },
    collectionType: [
      {
        type: String,
        enum: [
          "Summer Collection",
          "Winter Collection",
          "Traditional Collection",
          "Accessories Collection",
          "Shoes Collection",
          "Cosmetic Collection",
        ],
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
