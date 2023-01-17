require("dotenv").config();
require("./mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const morgan = require("morgan");
const startRoutes = require("./routes/start-routes.js");
const productsRoute = require("./routes/products-routes.js");
const checkoutRoute = require("./routes/checkout-routes.js");
const adminRoute = require("./routes/admin-routes.js");
const multer = require("multer");
const ProductModel = require("../models/ProductModel");

const port = process.env.PORT;
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.slice(-3)
    );
  },
});

const upload = multer({ storage: storage });

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.post("/add-product", upload.single("file"), async (req, res) => {
  console.log("body", req.body);
  const product = new ProductModel({
    name: req.body.name,
    img: req.file.filename,
    price: +req.body.price,
    stock: +req.body.stock,
    description: req.body.description,
  });
  console.log("product", product);

  await product.save();
  res.send(product);
});

app.use("/", startRoutes);
app.use("/products", productsRoute);
app.use("/checkout", checkoutRoute);
app.use("/admin", adminRoute);
app.get("/", async (req, res) => {});

app.listen(port || 8000, () => {
  console.log(`http://localhost:${port}`);
});
