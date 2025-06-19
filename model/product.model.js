const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: [
        {
            type: String,
            enum: ["Men", "Women", "Kids", "Electronics", "Home", "Accessories", "Footwear", "Cosmetics"]
        }
    ],
    collectionType: [
        {
            type: String,
            enum: ["Summer Collection", "Winter Collection", "Shoes Collection", "Accessories Collection", "Cosmetic Collection"]
        }
    ],
    price: {
        type: Number,
        required: true
    },
    size: [
        {
            clothSize:{
                type: String,
                enum: ["S", "M", "L", "XL", "XXL"]
            },
            shoesSize:{
                type: Number,
                enum: [6, 7, 8, 9, 10]
            }
        }
    ],
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    tags: {
        type: String
    },
    imageUrl: [
        {
            type: String,
            required: true
        }
    ]
},
{
    timestamps: true
}
)

const Product = mongoose.model("Product", productSchema);
module.exports = Product;