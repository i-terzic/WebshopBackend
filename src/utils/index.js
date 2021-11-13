const path = require("path");
const Joi = require("@hapi/joi");

function getSrcPath(dirname) {
  const parts = dirname.split(path.sep).slice(0, -1);
  return parts.join(path.sep);
}

const itemSchema = Joi.object({
  category: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  desciption: Joi.string().trim().required(),
  price: Joi.number().precision(2).required(),
});

module.exports = {
  getSrcPath,
  itemSchema,
};
