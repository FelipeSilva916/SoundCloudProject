"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Albums", [
      {
        title: "Demo Album",
        description: "An album about demotion",
        userId: 1
      },
      {
        title: "Giants Greatest Hits",
        description: "Don't Stop Believing",
        userId: 3
      },
      {
        title: "The Second Demo-lition",
        description: "We had to demolish more things",
        userId: 1
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
