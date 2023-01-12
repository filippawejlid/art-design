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

const port = process.env.PORT;
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.use(morgan("combined"));
app.use(bodyParser.json());

app.use(cors());

app.use("/", startRoutes);
app.use("/products", productsRoute);
app.use("/checkout", checkoutRoute);
app.use("/admin", adminRoute);
app.get("/", async (req, res) => {});

app.listen(port || 8000, () => {
  console.log(`http://localhost:${port}`);
});
