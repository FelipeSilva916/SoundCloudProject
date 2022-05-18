"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Albums", [
      {
        //1
        title: "Demo Album",
        description: "An album about demotion",
        userId: 1,
        previewImg: "www.imagepreview.com"
      },
      {
        //2
        title: "Giants Greatest Hits",
        description: "Don't Stop Believing",
        userId: 3,
        previewImg: "www.imagepreview.com"
      },
      {
        //3
        title: "The Second Demo-lition",
        description: "We had to demolish more things",
        userId: 1,
        previewImg: "www.imagepreview.com"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Albums", {
      title: {
        [Op.in]: [
          "Demo Album",
          "Giants Greatest Hits",
          "The Second Demo-lition"
        ]
      }
    });
  }
};
