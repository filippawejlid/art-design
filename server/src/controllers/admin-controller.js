const ProductModel = require("../../models/ProductModel");

exports.getIsAdmin = async (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  if (
    user.username === process.env.ADMINUSERNAME &&
    user.password === process.env.ADMINPASSWORD
  ) {
    res.send("Success");
  } else {
    res.send("Falsey");
  }
};

exports.editProduct = async (req, res, next) => {
  await ProductModel.updateOne(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
      },
    }
  );

  const updatedProduct = await ProductModel.findOne({ _id: req.body._id });
  res.send(updatedProduct);
};

exports.deleteProduct = async (req, res, next) => {
  await ProductModel.findOneAndDelete({ _id: req.params.id });
};
