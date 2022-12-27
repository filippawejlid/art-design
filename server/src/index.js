// const { required } = require("@vuelidate/validators");
// const nodemailer = require("nodemailer");

require("dotenv").config();
require("./mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const startRoutes = require("./routes/start-routes.js");
const productsRoute = require("./routes/products-routes.js");
const checkoutRoute = require("./routes/products-routes.js");

const port = process.env.PORT;
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use("/", startRoutes);
app.use("/products", productsRoute);
app.use("/checkout", checkoutRoute);
app.get("/", async (req, res) => {
  console.log("hallå");
});

app.listen(port || 8000, () => {
  console.log(`http://localhost:${port}`);
});
