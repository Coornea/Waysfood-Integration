"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class transaction extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         transaction.hasMany(models.order, {
            as: "orders",
            foreignKey: {
               name: "idTransaction",
            },
         });
         transaction.belongsTo(models.user, {
            as: "buyer",
            foreignKey: {
               name: "idCustomer",
            },
         });
         transaction.belongsTo(models.user, {
            as: "seller",
            foreignKey: {
               name: "idPartner",
            },
         });
      }
   }
   transaction.init(
      {
         idCustomer: DataTypes.INTEGER,
         idPartner: DataTypes.INTEGER,
         status: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "transaction",
      }
   );
   return transaction;
};
