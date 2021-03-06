const path = require('path');
const Joi = require('@hapi/joi');
const { QueryTypes } = require('sequelize');
const { db } = require('./database');

function getSrcPath(dirname) {
  const parts = dirname.split(path.sep).slice(0, -1);
  return parts.join(path.sep);
}

function convertBase64toFile(base64) {
  const arr = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  const buffer = Buffer.from(arr[2], 'base64');
  return buffer;
}

const newItemSchema = Joi.object({
  // category: Joi.string().trim().required(), // category is not required, since the endpoint for the resourcer is the category
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  price: Joi.number().precision(2).required(),
  img: Joi.binary(),
});

const itemSchema = Joi.object({
  // category: Joi.string().trim().required(), // category is not required, since the endpoint for the resourcer is the category
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  price: Joi.number().precision(2).required(),
});

async function categoryExists(category) {
  try {
    const data = await db.query(
      `SELECT * FROM shop.categories WHERE id ='${category}'`,
      { type: QueryTypes.SELECT }
    );
    return data.length !== 0;
  } catch (error) {
    return false;
  }
}

function padNumber(num, places) {
  return String(num).padStart(places, '0');
}

function getCategoryName(category) {
  if (!category.endsWith('s')) return category;
  return category.slice(0, -1);
}

module.exports = {
  getSrcPath,
  itemSchema,
  categoryExists,
  padNumber,
  getCategoryName,
  newItemSchema,
  convertBase64toFile,
};
