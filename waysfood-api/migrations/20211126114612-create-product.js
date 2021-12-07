"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("products", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         title: {
            type: Sequelize.STRING,
         },
         price: {
            type: Sequelize.INTEGER,
         },
         image: {
            type: Sequelize.STRING,
         },
         idUser: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
               model: "users",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
         },
         // qty: {
         //    type: Sequelize.INTEGER,
         // },
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
      await queryInterface.dropTable("products");
   },
};
