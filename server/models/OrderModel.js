const { Types, model, Schema } = require("mongoose");

const OrderSchema = Schema({
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
  },
  products: [{ type: Types.ObjectId, ref: "Products" }],
  totalAmount: { type: Number, required: true },
});

const OrderModel = model("Orders", OrderSchema);
module.exports = OrderModel;
