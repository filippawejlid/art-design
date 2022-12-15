const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

module.exports = mongoose.connect(process.env.CONNECTION_STRING);
