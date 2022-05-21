"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      Album.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "Artist"
      }),
        Album.hasMany(models.Song, { foreignKey: "albumId" });
    }
  }
  Album.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      previewImg: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      url: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: "Album"
    }
  );
  return Album;
};
