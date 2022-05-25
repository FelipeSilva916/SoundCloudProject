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
        body: "Classic!!"
      },
      {
        userId: 2,
        songId: 3,
        body: "Cant have an LP playlist without this"
      },
      {
        userId: 1,
        songId: 3,
        body: "Great Song, love Crawling!"
      },
      {
        userId: 2,
        songId: 4,
        body: "Great song! 💗"
      },
      {
        userId: 4,
        songId: 4,
        body: "One of my favorites! 😍"
      },
      {
        userId: 1,
        songId: 5,
        body: "Monkey Wrench is awesome!"
      },
      {
        userId: 2,
        songId: 5,
        body: "🐒!"
      },
      {
        userId: 2,
        songId: 6,
        body: "There he goes!"
      },
      {
        userId: 1,
        songId: 6,
        body: "FF Classic!"
      },
      {
        userId: 2,
        songId: 7,
        body: "This song inspires me!"
      },
      {
        userId: 1,
        songId: 7,
        body: "Keep Grinding!!!"
      },
      {
        userId: 1,
        songId: 8,
        body: "One of your bests Ben"
      },
      {
        userId: 2,
        songId: 8,
        body: "Hype song!!!"
      },
      {
        userId: 5,
        songId: 8,
        body: "Def one of my favorites"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  }
};
