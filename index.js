const express = require("express");
const cors = require("cors");
const fs = require("fs");
require('dotenv').config();

const app = express();

// ✅ Corrected CORS configuration
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Database connection and models
const { initializeDatabse } = require("./db/db.connect");
const Product = require("./model/product.model");

initializeDatabse();

// Read product data from JSON
const jsonData = fs.readFileSync("products.json", "utf-8");
const productsData = JSON.parse(jsonData);

// ✅ Seed data function (can be run once by uncommenting seedData())
function seedData() {
  try {
    for (const productData of productsData) {
      const newProduct = new Product({
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        price: productData.price,
        size: productData.size,
        stock: productData.stock,
        rating: productData.rating,
        tags: productData.tags,
        imageUrl: productData.imageUrl,
      });
      newProduct.save();
    }
  } catch (error) {
    console.log("Error seeding data.", error);
  }
}
//seedData();

// ✅ Fetch all products
async function readAllProducts() {
  try {
    const allProducts = await Product.find();
    console.log(allProducts)
    return allProducts;
  } catch (error) {
    console.log("Error reading all products", error);
    return [];
  }
}


// ✅ GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await readAllProducts();
    if (products.length !== 0) {
      res.status(200).json({products});
    } else {
      res.status(404).json({ error: "No products found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

// ✅ GET product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({product});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product." });
  }
});


// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
