"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "usersId",
        onDelete: "CASCADE"
      }),
        Comment.belongsTo(models.Song, {
          foreignKey: "songId",
          onDelete: "CASCADE"
        });
    }
  }
  Comment.init(
    {
      body: { type: DataTypes.STRING, allowNull: false },
      songId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: "Comment"
    }
  );
  return Comment;
};
