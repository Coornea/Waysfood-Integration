"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Product extends Model {
      static associate(models) {
         // define association here
         Product.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId",
         });
      }
   }
   Product.init(
      {
         title: DataTypes.STRING,
         price: DataTypes.INTEGER,
         image: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Product",
      }
   );
   return Product;
};
