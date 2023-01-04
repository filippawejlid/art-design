const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/checkout-controller");

router.get("/get-order/:id", checkoutController.getOrder);
router.post("/post-order", checkoutController.postOrder);
router.get("/get-all-orders", checkoutController.getAllOrders);

module.exports = router;
