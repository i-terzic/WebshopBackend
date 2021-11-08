const express = require("express");
const webshop = require("./webshop");

const router = express.Router();

router.use("/webshop", webshop);

module.exports = router;
