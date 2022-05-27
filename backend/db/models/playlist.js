"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      const playlistSong = {
        foreignKey: "playlistId",
        otherKey: "songId",
        through: "PlaylistSong"
      };
      Playlist.belongsToMany(models.Song, playlistSong),
        Playlist.belongsTo(models.User, {
          foreignKey: "userId"
        });
    }
  }
  Playlist.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      previewImage: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: "Playlist"
    }
  );
  return Playlist;
};
