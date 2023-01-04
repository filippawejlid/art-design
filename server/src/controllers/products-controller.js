const ProductModel = require("../../models/ProductModel");

exports.getProducts = async (req, res, next) => {
  const products = await ProductModel.find();

  res.send(products);
};
