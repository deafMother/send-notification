const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();

const globalHandler = require("./utils/errorHandler");
const userRoute = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");

app.use(cors());
app.use(express.json());

// create a write stream (in append mode), a sime logger
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  {
    flags: "a",
  }
);

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.use("/user", userRoute);
app.use("/comment", commentRoute);

app.use(globalHandler);

module.exports = app;
