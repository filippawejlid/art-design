const OrderModel = require("../../models/OrderModel");
const nodemailer = require("nodemailer");

exports.postOrder = async (req, res, next) => {
  const order = new OrderModel({
    customer: req.body.customer,
    products: req.body.products,
    totalAmount: req.body.totalAmount,
  });

  await order.save();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "artanddesignswe@gmail.com",
      pass: "wofhayeljtpfrrml",
    },
  });

  var mailOptions = {
    from: "artanddesignswe@gmail.com",
    to: req.body.customer.email,
    subject: "Orderbekräftelse från Art & Design",
    text:
      "Hej " +
      req.body.customer.firstName +
      "! Vi har tagit emot din order och har påbörjat behandling av din beställning. Du kommer få ett mail med fler detaljer när din order är redo att hämtas. Vid övriga frågor ber vi dig kontakta oss på denna mail.",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.send(order);
};

exports.getOrder = async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate("products");

  res.send(order);
};

exports.getAllOrders = async (req, res, next) => {
  const orders = await OrderModel.find().populate("products");

  res.send(orders);
};
