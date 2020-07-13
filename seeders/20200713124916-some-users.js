"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("users", [
        {
          name: "Diégo Teixeira da Costa",
          email: "d.teixeiradacosta@hotmail.com",
          phone: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log("Something went wrong:", error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
