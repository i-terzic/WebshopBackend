const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  newItemSchema,
  categoryExists,
  getSrcPath,
  padNumber,
  getCategoryName,
  convertBase64toFile,
} = require("../utils/index");
const { createCategory } = require("../utils/database");
const router = express.Router();

router.get("/", (req, res, next) => {
  //  TODO
});

router.post("/:category", async (req, res, next) => {
  const { category: id } = req.params;
  try {
    const validData = await newItemSchema.validateAsync(req.body);
    if (validData.length === 0) next(new Error(`No data supplied`));
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
    if (req.body.image64 !== null) {
      const buffer = convertBase64toFile(req.body.img);

      var msg = fs.writeFileSync(
        path.join(getSrcPath(__dirname), "static", name + padNum + ".jpg"),
        buffer,
        (err) => {
          return err === null
            ? "Successfully created img"
            : "An error has occured";
        }
      );
    }
    res.json({ [id]: data, message: msg });
  } catch (error) {
    next(error);
  }
});

router.put("/:category/:itemid", async (req, res, next) => {
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

router.delete("/:categoryid/:itemid", async (req, res, next) => {
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

module.exports = router;
