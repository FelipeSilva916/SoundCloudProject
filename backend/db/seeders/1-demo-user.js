"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        //User ID 1
        email: "demo@user.io",
        username: "Demo-lition",
        firstName: "Demo",
        lastName: "Lition",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        //User ID 2
        email: "felipe@user.io",
        username: "FelipeSilva916",
        firstName: "Felipe",
        lastName: "Silva",
        hashedPassword: bcrypt.hashSync("password2")
      },
      {
        //User ID 3
        email: "chester@linkinpark.io",
        username: "ChesterLP",
        firstName: "Chester",
        lastName: "Bennington",
        hashedPassword: bcrypt.hashSync("password3")
      },
      {
        //User ID 4
        email: "Macklemore@user.io",
        username: "Macklemore",
        firstName: "Benjamin",
        lastName: "Haggerty",
        hashedPassword: bcrypt.hashSync("password4")
      },
      {
        //User ID 5
        email: "dave@foofighters.com",
        username: "DaveG",
        firstName: "David",
        lastName: "Grohl",
        hashedPassword: bcrypt.hashSync("password5")
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
