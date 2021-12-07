"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("orders", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         idProduct: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
               model: "products",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
         },
         idTransaction: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
               model: "transactions",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
         },
         qty: {
            type: Sequelize.INTEGER,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("orders");
   },
};
