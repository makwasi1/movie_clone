//db connection

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect("mongodb://localhost/cinema", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection
  .then(() => console.log("Mongo db connected"))
  .catch((err) => console.log(err));

module.exports = db;
