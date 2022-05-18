"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    static associate(models) {
      // define association here
    }
  }
  PlaylistSong.init(
    {
      playlistId: { type: DataTypes.INTEGER, allowNull: false },
      songId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: "PlaylistSong"
    }
  );
  return PlaylistSong;
};
