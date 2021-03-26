"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.Order, {
        as: "order",
        foreignKey: "transactionId",
      });
      Transaction.belongsTo(models.User, {
        as: "userOrder",
        foreignKey: "userId",
      });
      Transaction.belongsTo(models.User, {
        as: "partnerOrder",
        foreignKey: "partnerId",
      });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      partnerId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
