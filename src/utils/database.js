const Sequelize = require("sequelize");
const connection =
  process.env.CONNECTION ||
  "postgres://postgres:14xy68NAIV@localhost:5432/webshop";

const db = new Sequelize(connection);

module.exports = {
  db,
};
