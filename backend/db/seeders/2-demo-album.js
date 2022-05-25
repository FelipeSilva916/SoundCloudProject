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
        title: "Hybrid Theory",
        description:
          "Hybrid Theory is the debut studio album by American rock band Linkin Park, released on October 24, 2000, through Warner Bros.",
        userId: 3,
        previewImg: "www.imagepreview.com"
      },
      {
        //3
        title: "Meteora",
        description:
          "Meteora is the second studio album by American rock band Linkin Park. It was released on March 25, 2003, through Warner Bros. Records, following Reanimation, a collaboration album which featured remixes of songs included on their 2000 debut studio album Hybrid Theory.",
        userId: 3,
        previewImg: "www.imagepreview.com"
      },
      {
        //4
        title: "The Colour and the Shape",
        description:
          "The Colour and the Shape is the second studio album by American rock band Foo Fighters, released on May 20, 1997, through Roswell and Capitol Records.",
        userId: 5,
        previewImg: "www.imagepreview.com"
      },
      {
        //5
        title: "The Heist",
        description:
          "The Heist is the debut studio album by American hip hop duo Macklemore & Ryan Lewis. It was released on October 9, 2012, by Macklemore LLC, distributed under the Alternative Distribution Alliance.",
        userId: 4,
        previewImg: "www.imagepreview.com"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Albums", null, {});
  }
};
