"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn(
        "todoItems",
        "important",
        { type: Sequelize.BOOLEAN },
        {}
      );
    } catch (error) {
      console.log("something went wrong:", error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("todoItems", "important", {});
  },
};
