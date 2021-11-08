const express = require("express");
const { db } = require("../utils/database");
const { Sequelize, QueryTypes } = require("sequelize");
const router = express.Router();

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

router.get("/getimages/:imgid", async (req, res, next) => {
  res.json({
    message: "get Images",
  });
});

module.exports = router;
