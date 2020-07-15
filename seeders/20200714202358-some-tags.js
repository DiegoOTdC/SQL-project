"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("tags", [
        {
          title: "Tag1 = awesome",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Tag2 = cool",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log("something went wrong:", error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
