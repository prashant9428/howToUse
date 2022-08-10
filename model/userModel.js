const { DataTypes } = require("../config/connection");
const { user } = require("../config/dbConfig");

module.exports = function (sequelize) {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      orgId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        foreginKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    },
    {
      tableName: "user",
    }
  );

  //user.addHook('beforeQuery')

  // User.addHook('beforeFind', (options) => {

  //   if (options?.where) {
  //     options.where['orgId'] = 1
  //   } else {
  //     options['where'] = { "orgId": 1 }
  //   }
  // });
  return User;
};
