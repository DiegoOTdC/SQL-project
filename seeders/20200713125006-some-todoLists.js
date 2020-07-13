"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("todoLists", [
        { name: "Grocery list", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Codaisseur Reader List",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log("Something went wrong:", error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoLists", null, {});
  },
};
