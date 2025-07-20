const express = require("express");
const router = express.Router();
const Cart = require("../model/cart.model");

// ➕ Add product to cart
router.post("/", async (req, res) => {
  const { productId } = req.body;
  try {
    const exists = await Cart.findOne({ productId });
    if (exists) return res.status(409).json({ message: "Already in cart" });

    const item = new Cart({ productId });
    await item.save();
    res.status(201).json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get all cart items (with product details)
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete a cart item
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
