"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {
      const playlistsSongMap = {
        foreignKey: "songId",
        otherKey: "playlistId",
        through: "PlaylistSong"
      };
      Song.belongsToMany(models.Playlist, playlistsSongMap),
        Song.belongsTo(models.User, {
          foreignKey: "userId",
          as: "Artist"
        }),
        Song.belongsTo(models.Album, { foreignKey: "albumId" }),
        Song.hasMany(models.Comment, {
          foreignKey: "songId"
        });
    }
  }
  Song.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      albumId: {
        type: DataTypes.INTEGER
        // allowNull: false
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: {
        type: DataTypes.STRING
        // allowNull: false
      },
      url: { type: DataTypes.STRING, allowNull: false },
      previewImage: { type: DataTypes.STRING, allowNull: false }
    },
    {
      sequelize,
      modelName: "Song"
    }
  );
  return Song;
};
