const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(`postgres://postgres:dontsaygoodbye1@localhost:5432/postgres`);

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
};

module.exports = { sq: sequelize, testDbConnection };

