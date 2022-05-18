"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        //1
        email: "demo@user.io",
        username: "Demo-lition",
        firstName: "Demo",
        lastName: "Lition",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        //2
        email: "felipe@user.io",
        username: "Felipe",
        firstName: "Felipe",
        lastName: "Silva",
        hashedPassword: bcrypt.hashSync("password2")
      },
      {
        //3
        email: "busterPosey@user.io",
        username: "Buster",
        firstName: "Gerald",
        lastName: "Posey",
        hashedPassword: bcrypt.hashSync("password3")
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: ["Demo-lition", "Felipe", "Buster"]
        }
      },
      {}
    );
  }
};
