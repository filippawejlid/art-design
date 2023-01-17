const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-controller");

router.post("/get-admin", adminController.getIsAdmin);
router.post("/edit-product", adminController.editProduct);
router.get("/delete-product/:id", adminController.deleteProduct);
// router.post("/add-product", adminController.addProduct);

module.exports = router;
