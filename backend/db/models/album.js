"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      Album.belongsTo(models.User, {
        foreignKey: "userId"
        // onDelete: "CASCADE"
      }),
        Album.hasMany(models.Song, {
          foreignKey: "albumId"
          // onDelete: "CASCADE",
          // hooks: true
        });
    }
  }
  Album.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      previewImg: { type: DataTypes.STRING, allowNull: false }
    },
    {
      sequelize,
      modelName: "Album"
    }
  );
  return Album;
};
