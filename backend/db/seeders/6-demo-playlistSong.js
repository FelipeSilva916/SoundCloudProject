"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "PlaylistSongs",
      [
        {
          playlistId: 1,
          songId: 1
        },
        {
          playlistId: 1,
          songId: 3
        },
        {
          playlistId: 2,
          songId: 1
        },
        {
          playlistId: 2,
          songId: 2
        },
        {
          playlistId: 2,
          songId: 3
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PlaylistSongs", null, {});
  }
};
