// require("dotenv").config();
// require("../mongoose");
// const { required } = require("@vuelidate/validators");
// const express = require("express");
// const nodemailer = require("nodemailer");

// const port = 8000;
// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

// app.get("/", async (req, res) => {
//   console.log("hej");
// });

// app.listen(port, () => {
//   console.log(`http://localhost:${port}`);
// });
console.log("hej");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    msg: "Hello World",
  });
});

app.listen(process.env.Port || 8000);
