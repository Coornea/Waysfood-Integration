"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class user extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         user.hasMany(models.product, {
            as: "products",
            foreignKey: {
               name: "idUser",
            },
         });

         user.hasMany(models.transaction, {
            as: "buyerTransaction",
            foreignKey: {
               name: "idBuyer",
            },
         });
         user.hasMany(models.transaction, {
            as: "sellerTransaction",
            foreignKey: {
               name: "idSeller",
            },
         });
      }
   }
   user.init(
      {
         fullName: DataTypes.STRING,
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         gender: DataTypes.STRING,
         phone: DataTypes.STRING,
         role: DataTypes.STRING,
         image: DataTypes.STRING,
         location: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "user",
      }
   );
   return user;
};
