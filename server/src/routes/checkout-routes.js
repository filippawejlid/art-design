const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/checkout-controller");

router.get("/post-order", checkoutController.postOrder);

module.exports = router;
