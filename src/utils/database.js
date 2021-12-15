const Sequelize = require("sequelize");
const connection =
  process.env.CONNECTION ;

const db = new Sequelize(connection);

function createCategory(category) {
  return db.define(
    category,
    {
      _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        length: 50,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        length: 50,
      },
      imgid: {
        type: Sequelize.STRING,
        allowNull: false,
        length: 50,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        length: 255,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    },
    {
      schema: "shop",
    }
  );
}

module.exports = {
  db,
  createCategory,
};
