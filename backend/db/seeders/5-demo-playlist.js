"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Playlists", [
      {
        //Playlist 1
        name: "My Rock Playlist!",
        previewImage: "www.previewImg.com",
        userId: "1"
      },
      {
        // Playlist 2
        name: "My top 3 songs",
        previewImage: "www.previewImg.com",
        userId: "2"
      },
      {
        // Playlist 3
        name: "My Macklemore Favorites",
        previewImage: "www.previewImg.com",
        userId: "5"
      },
      {
        // Playlist 4
        name: "My Favorite Foo-Fighters",
        previewImage: "www.previewImg.com",
        userId: "3"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Playlists", null, {});
  }
};
