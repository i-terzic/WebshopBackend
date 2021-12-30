const express = require('express');
const fs = require('fs');
const path = require('path');
const { createCategory } = require('../utils/database');
const {
  newItemSchema,
  categoryExists,
  getSrcPath,
  padNumber,
  getCategoryName,
  convertBase64toFile,
  itemSchema,
} = require('../utils/index');

const router = express.Router();

router.post('/:category', async (req, res, next) => {
  let msg;
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

    const imgPath =
      req.body.image !== null
        ? path.join(getSrcPath(__dirname), 'static', `${name + padNum}.jpg`)
        : 'No Image';
    if (req.body.image64 !== null) {
      const buffer = convertBase64toFile(req.body.img);

      msg = fs.writeFileSync(imgPath, buffer, (err) =>
        err === null ? 'Successfully created img' : 'An error has occured'
      );
    }
    const data = await item.create({
      ...validData,
      imgid: imgPath,
      id: name + padNum,
    });
    res.json({ [id]: data, message: msg });
  } catch (error) {
    next(error);
  }
});

router.put('/:category/:itemid', async (req, res, next) => {
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

router.delete('/:categoryid/:itemid', async (req, res, next) => {
  const { category: id, itemid } = req.params;
  try {
    const validData = await itemSchema.validateAsync(req.body);
    if (validData.length === 0) next(new Error(`No valid data supplied`));
    if (!categoryExists(id))
      res.json({ message: `Category: ${id} does not exists` });
    const item = createCategory(id);
    const result = await item.findAll({
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
