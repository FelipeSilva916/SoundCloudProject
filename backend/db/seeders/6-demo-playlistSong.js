"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "PlaylistSongs",
      [
        {
          playlistId: 1,
          songId: 2
        },
        {
          playlistId: 1,
          songId: 3
        },
        {
          playlistId: 1,
          songId: 4
        },
        {
          playlistId: 1,
          songId: 6
        },
        {
          playlistId: 2,
          songId: 4
        },
        {
          playlistId: 2,
          songId: 3
        },
        {
          playlistId: 2,
          songId: 7
        },
        {
          playlistId: 3,
          songId: 7
        },
        {
          playlistId: 3,
          songId: 8
        },
        {
          playlistId: 4,
          songId: 4
        },
        {
          playlistId: 4,
          songId: 5
        },
        {
          playlistId: 4,
          songId: 6
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PlaylistSongs", null, {});
  }
};
