const express = require("express");
const { db } = require("../utils/database");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const path = require("path");
const { getSrcPath, itemSchema } = require("../utils/index.js");

// router.use("/static", express.static("../static", { root: __dirname }));

router.get("/categories", async (req, res, next) => {
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

router.get("/category/:categoryid", async (req, res, next) => {
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

router.get("/category/:categoryid/:itemid", async (req, res, next) => {
  try {
    const { categoryid, itemid } = req.params;
    const data = await db.query(
      `SELECT * FROM shop.${categoryid} WHERE id=\'${itemid}\'`,
      { type: QueryTypes.SELECT }
    );
    if (data.length === 0)
      throw new Error(`Category: ${categoryid} or Item ${itemid} is not valid`);
    res.json({ [itemid]: data, status: "ok", code: 200 });
  } catch (error) {
    next(error);
  }
});

// router.post("/category/item/:categoryid", async (req, res, next) => {
//   try {
//     const { data } = req.body;
//     // const value = await itemSchema.validateAsync(data);
//     // if (!value) next(new Error({ message: "Schema invalid" }));
//     res.json(data);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/image/:imgid", async (req, res, next) => {
//   try {
//     const { imgid } = req.params;
//     const filePath = path.join(getSrcPath(__dirname), "static", `${imgid}.jpg`);
//     res.sendFile(filePath);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
