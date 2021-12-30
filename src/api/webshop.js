const express = require('express');
const { QueryTypes } = require('sequelize');
const path = require('path');
const { db } = require('../utils/database');
const { getSrcPath } = require('../utils/index');

const router = express.Router();

router.get('/categories', async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM shop.categories', {
      type: QueryTypes.SELECT,
    });

    res.json({
      categories: data,
      status: 'ok',
      code: 200,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/category/:categoryid', async (req, res, next) => {
  try {
    const { categoryid: id } = req.params;
    const data = await db.query(`SELECT * FROM shop.${id}`, {
      type: QueryTypes.SELECT,
    });
    res.json({ [id]: data, status: 'ok', code: 200 });
  } catch (error) {
    next(error);
  }
});

router.post('/category/:category', async (req, res) => {
  res.json({
    message: "You don't have permission to post a new item!",
  });
});

router.put('/category/:category/:itemid', async (req, res) => {
  res.json({
    message: "You don't have permission to change an item!",
  });
});

router.delete('/category/:categoryid/:itemid', async (req, res) => {
  res.json({
    message: "You don't have permission to delete an item!",
  });
});

router.get('/category/:categoryid/:itemid', async (req, res, next) => {
  try {
    const { categoryid, itemid } = req.params;
    const data = await db.query(
      `SELECT * FROM shop.${categoryid} WHERE id='${itemid}'`,
      { type: QueryTypes.SELECT }
    );
    if (data.length === 0)
      throw new Error(`Category: ${categoryid} or Item ${itemid} is not valid`);
    res.json({ [itemid]: data, status: 'ok', code: 200 });
  } catch (error) {
    next(error);
  }
});

router.get('/image/:imgid', async (req, res, next) => {
  try {
    const { imgid } = req.params;
    const filePath = path.join(getSrcPath(__dirname), 'static', `${imgid}.jpg`);
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
});

// router.post('/imtage/:imgid', async (req, res, next) => {
//   // TODO
// });

module.exports = router;
