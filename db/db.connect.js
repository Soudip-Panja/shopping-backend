const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB;

const initializeDatabse = async () => {
  await mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Connected to Database.");
    })
    .catch((error) => console.log("Error connecting database", error));
};
module.exports = { initializeDatabse };
