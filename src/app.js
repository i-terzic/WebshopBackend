const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const api = require("./api");
const path = require("path");

const app = express();

require("dotenv").config(".env");

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/api/v1", api);

module.exports = app;
