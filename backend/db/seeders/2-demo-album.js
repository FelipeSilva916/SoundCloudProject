"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Albums", [
      {
        //1
        title: "Demo Album",
        description: "An album about demotion",
        userId: 1,
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/demoAlbum.jpeg"
      },
      {
        //2
        title: "Hybrid Theory",
        description:
          "Hybrid Theory is the debut studio album by American rock band Linkin Park, released on October 24, 2000, through Warner Bros.",
        userId: 3,
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/hybridTheory.jpeg"
      },
      {
        //3
        title: "Meteora",
        description:
          "Meteora is the second studio album by American rock band Linkin Park. It was released on March 25, 2003, through Warner Bros.",
        userId: 3,
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/meteora.jpeg"
      },
      {
        //4
        title: "The Colour and the Shape",
        description:
          "The Colour and the Shape is the second studio album by American rock band Foo Fighters, released on May 20, 1997, through Roswell and Capitol Records.",
        userId: 5,
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theColourAndTheShape.jpeg"
      },
      {
        //5
        title: "The Heist",
        description:
          "The Heist is the debut studio album by American hip hop duo Macklemore & Ryan Lewis. It was released on October 9, 2012, by Macklemore LLC.",
        userId: 4,
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theHeist.jpg"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Albums", null, {});
  }
};
