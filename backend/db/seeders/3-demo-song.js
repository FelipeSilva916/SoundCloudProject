"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Songs", [
      {
        title: "Song Demo",
        description: "The best demo-ever",
        url: "www.thissong.com",
        previewImg: "www.previewimg.com",
        userId: "1",
        albumId: "1"
      },
      {
        title: "SF Giants Anthem",
        description: "Dont Stop Believing by Ashkon",
        url: "www.thissong.com",
        previewImg: "www.previewimg.com",
        userId: "3",
        albumId: "2"
      },
      {
        title: "Song Demo II",
        description: "The best demo-ever, Again!",
        url: "www.thissong.com",
        previewImg: "www.previewimg.com",
        userId: "1",
        albumId: "1"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Songs", null, {});
  }
};
