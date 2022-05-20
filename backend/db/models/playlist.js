"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      Playlist.belongsToMany(models.Song, { through: models.PlaylistSong }),
        Playlist.belongsTo(models.User, {
          foreignKey: "userId"
          // onDelete: "CASCADE"
        });
    }
  }
  Playlist.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      previewImg: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: "Playlist"
    }
  );
  return Playlist;
};
