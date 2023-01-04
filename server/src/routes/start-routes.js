const express = require("express");
const router = express.Router();

const startController = require("../controllers/start-controller");

router.post("/add-base-products", startController.setProducts);

module.exports = router;
