const express = require("express");
const router = express.Router();
const Product = require("../model/product.model");

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length !== 0) {
      res.status(200).json({ products });
    } else {
      res.status(404).json({ error: "No products found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

// ✅ Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product." });
  }
});

module.exports = router;
