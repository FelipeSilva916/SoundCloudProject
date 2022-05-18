"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Playlists", [
      {
        //1
        name: "My Demo-lition playlist!",
        previewImg: "www.previewImg.com",
        userId: "1"
      },
      {
        //2
        name: "My top 3 songs",
        previewImg: "www.previewImg.com",
        userId: "2"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Playlists", null, {});
  }
};
