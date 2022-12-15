const ProductModel = require("../../models/ProductModel");

exports.setProducts = async (req, res, next) => {
  const product = new ProductModel({
    name: req.body.name,
    img: req.body.img,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
  });

  await product.save();

  res.send(product);
};
