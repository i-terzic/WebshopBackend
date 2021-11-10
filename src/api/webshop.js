const express = require("express");
const { db } = require("../utils/database");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const path = require("path");
const { getSrcPath } = require("../utils/index.js");

router.use("/static", express.static("../static", { root: __dirname }));

router.get("/getcategories", async (req, res, next) => {
  try {
    const data = await db.query("SELECT * FROM shop.categories", {
      type: QueryTypes.SELECT,
    });

    res.json({
      categories: data,
      status: "ok",
      code: 200,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/getcategory/:categoryid", async (req, res, next) => {
  try {
    const { categoryid: id } = req.params;
    const data = await db.query(`SELECT * FROM shop.${id}`, {
      type: QueryTypes.SELECT,
    });
    res.json({ [id]: data, status: "ok", code: 200 });
  } catch (error) {
    next(error);
  }
});

router.get("/getimage/:imgid", async (req, res, next) => {
  try {
    const { imgid } = req.params;
    const filePath = path.join(getSrcPath(__dirname), "static", `${imgid}.jpg`);
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
