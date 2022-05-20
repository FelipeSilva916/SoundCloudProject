"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {
      Song.belongsToMany(models.Playlist, { through: models.PlaylistSong }),
        Song.belongsTo(models.User, {
          foreignKey: "userId",
          onDelete: "CASCADE",
          as: "Artist"
        }),
        Song.belongsTo(models.Album, { foreignKey: "albumId" }),
        Song.hasMany(models.Comment, {
          foreignKey: "songId",
          onDelete: "CASCADE"
        });
    }
  }
  Song.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      previewImg: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      albumId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: "Song"
    }
  );
  return Song;
};
