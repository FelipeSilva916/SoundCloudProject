"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Comments", [
      {
        userId: 2,
        songId: 1,
        body: "Love this demo song!"
      },
      {
        userId: 2,
        songId: 2,
        body: "World Series Champ 🏆"
      },
      {
        userId: 2,
        songId: 3,
        body: "Best demo song ever"
      },
      {
        userId: 1,
        songId: 3,
        body: "Comments to test the routes from user 1"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  }
};
