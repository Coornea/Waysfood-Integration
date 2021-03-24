"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "User1",
        email: "user1@gmail.com",
        password: "user12345",
        phone: "081239851232",
        location: null,
        gender: "male",
        image: "user-default.png",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "User3",
        email: "user3@gmail.com",
        password: "user12345",
        phone: "081239851232",
        location: null,
        gender: "female",
        image: "user-default.png",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "User1",
        email: "user1@gmail.com",
        password: "user12345",
        phone: "081239851232",
        location: null,
        gender: "female",
        image: "user-default.png",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Geprek Bensu",
        email: "bensu@geprek.com",
        password: "partner12345",
        phone: "075512398512",
        location: null,
        gender: "-",
        image: "partner-default.png",
        role: "partner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "KFC",
        email: "kfc@kfcsupport.com",
        password: "partner12345",
        phone: "075512398512",
        location: null,
        gender: "-",
        image: "partner-default.png",
        role: "partner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Burger King",
        email: "burger@king.com",
        password: "partner12345",
        phone: "075512398512",
        location: null,
        gender: "-",
        image: "partner-default.png",
        role: "partner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Starbucks",
        email: "star@bucks.com",
        password: "partner12345",
        phone: "075512398512",
        location: null,
        gender: "-",
        image: "partner-default.png",
        role: "partner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Kopi Kenangan",
        email: "kopi@kenangan.com",
        password: "partner12345",
        phone: "075512398512",
        location: null,
        gender: "-",
        image: "partner-default.png",
        role: "partner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
