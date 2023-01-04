const ProductModel = require("../../models/ProductModel");

exports.setProducts = async (req, res, next) => {
  const product = new ProductModel({
    name: req.body.name,
    img: req.body.img,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
  });

  let existingProduct = await ProductModel.findOne({ name: product.name });
  if (existingProduct) {
    res.send({});
  } else {
    await product.save();
    res.send(product);
  }
};
