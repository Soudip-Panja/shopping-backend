const express = require("express");
const router = express.Router();
const Wishlist = require("./model/wishlist.model");
const Product = require("./model/product.model");

// ➕ Add product to wishlist
router.post("/", async (req, res) => {
  const { productId } = req.body;
  try {
    const exists = await Wishlist.findOne({ productId });
    if (exists) return res.status(409).json({ message: "Already in wishlist" });

    const item = new Wishlist({ productId });
    await item.save();
    res.status(201).json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get all wishlist items (with product details)
router.get("/", async (req, res) => {
  try {
    const wishlist = await Wishlist.find().populate("productId");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete a wishlist item
router.delete("/:id", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
