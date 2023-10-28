const { sq } = require("../config/db");

const { DataTypes } = require("sequelize");

const User = sq.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    face: {
      type: DataTypes.STRING,
    },
});

(async () => {
  await sq.sync();
  // Code here
})();

module.exports = User;