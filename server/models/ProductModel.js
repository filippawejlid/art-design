const { Types, model, Schema } = require("mongoose");

const ProductSchema = Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
});

const ProductModel = model("Products", ProductSchema);
module.exports = ProductModel;
