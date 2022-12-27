const OrderModel = require("../../models/OrderModel");

exports.postOrder = async (req, res, next) => {
  console.log(req.body);

  res.send("klaro");
};
