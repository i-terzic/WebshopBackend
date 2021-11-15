const express = require("express");
const webshop = require("./webshop");
const info = require("./info");

const router = express.Router();

router.use("/webshop", webshop);
// router.use("/info", info);
module.exports = router;
