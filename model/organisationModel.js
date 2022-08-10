const { DataTypes} = require("../config/connection");
const user  = require("./userModel")
module.exports = function (sequelize) {
  const Org = sequelize.define(
    "Org",
    {
      orgId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
      },

      orgName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      orgUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    },
    {
      tableName: "org",
    }
  );
  
  Org.hasMany(user(sequelize),{
    foreignKey: "orgId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  return Org;
};
