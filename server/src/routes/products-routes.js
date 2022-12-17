const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products-controller");

router.get("/products/getproducts", productsController.getProducts);

module.exports = router;