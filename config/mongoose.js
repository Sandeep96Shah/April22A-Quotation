const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/quotation")
  .then(() => {
    console.log("Connected with MongoDb");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });
