const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const cors = require("cors");
require("dotenv").config();
require("./config");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//middlewares
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
