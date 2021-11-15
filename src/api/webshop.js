const express = require("express");
const { db, createCategory } = require("../utils/database");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const {
  getSrcPath,
  itemSchema,
  categoryExists,
  padNumber,
  getCategoryName,
} = require("../utils/index.js");

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

router.post("/category/:category", async (req, res, next) => {
  const { category: id } = req.params;
  try {
    const validData = await itemSchema.validateAsync(req.body);
    if (validData.length === 0) next(new Error(`No valid data supplied`));
    if (!categoryExists(id))
      res.json({ message: `Category: ${id} does not exists` });

    const item = createCategory(id);
    const results = await item.findAll();

    const padNum = padNumber(results.length + 1, 2);
    const name = getCategoryName(id);
    const data = await item.create({
      ...validData,
      imgid: name + padNum,
      id: name + padNum,
    });
    res.json({ [id]: data });
  } catch (error) {
    next(error);
  }
});

router.put("/category/:category/:itemid", async (req, res, next) => {
  const { category: id, itemid } = req.params;
  try {
    const validData = await itemSchema.validateAsync(req.body);
    if (validData.length === 0) next(new Error(`No valid data supplied`));
    if (!categoryExists(id))
      res.json({ message: `Category: ${id} does not exists` });
    const item = createCategory(id);

    let result = await item.findAll({
      where: {
        id: itemid,
      },
    });
    if (!result) next(new Error(`ItemId: ${itemid} - is not a valid ItemId`));
    await item.update(
      {
        ...validData,
      },
      {
        where: {
          id: itemid,
        },
      }
    );
    result = await item.findAll({
      where: {
        id: itemid,
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/category/:categoryid/:itemid", async (req, res, next) => {
  const { category: id, itemid } = req.params;
  try {
    const validData = await itemSchema.validateAsync(req.body);
    if (validData.length === 0) next(new Error(`No valid data supplied`));
    if (!categoryExists(id))
      res.json({ message: `Category: ${id} does not exists` });
    const item = createCategory(id);
    let result = await item.findAll({
      where: {
        id: itemid,
      },
    });
    if (!result) next(new Error(`ItemId: ${itemid} - is not a valid ItemId`));
    await item.destroy({
      where: {
        id: itemid,
      },
    });
    res.json({ message: `Item ${itemid} - deleted successfully` });
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

router.get("/image/:imgid", async (req, res, next) => {
  try {
    const { imgid } = req.params;
    const filePath = path.join(getSrcPath(__dirname), "static", `${imgid}.jpg`);
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
});

router.post("/imtage/:imgid", async (req, res, next) => {
  // TODO
});

module.exports = router;
