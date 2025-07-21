const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// ✅ Initialize DB
const { initializeDatabse } = require("./db/db.connect");
initializeDatabse();

// ✅ Import Routes
const productRoutes = require("./routes/products.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const cartRoutes = require("./routes/cart.routes");
const addressRoutes = require("./routes/address.routes");

// ✅ Use Routes
app.use("/products", productRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/cart", cartRoutes);
app.use("/address", addressRoutes); 

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
