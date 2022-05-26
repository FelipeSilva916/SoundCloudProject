"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Songs", [
      {
        //song 1
        title: "Song Demo",
        description: "The best demo-ever",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "1",
        albumId: "1"
      },
      {
        //song 2
        title: "Papercut",
        description: "Song by Linkin Park",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "3",
        albumId: "2"
      },
      {
        //song 3
        title: "Crawling",
        description: "Song by Linkin Park",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "3",
        albumId: "2"
      },
      {
        //song 4
        title: "Everlong",
        description: "Song by the Foo Fighters",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "5",
        albumId: "4"
      },
      {
        //song 5
        title: "Monkey Wrench",
        description: "Song by the Foo Fighters",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "5",
        albumId: "4"
      },
      {
        //song 6
        title: "My Hero",
        description: "Song by the Foo Fighters",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "5",
        albumId: "4"
      },
      {
        //song 7
        title: "Ten Thousand Hours",
        description: "Song by Macklemore",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "4",
        albumId: "5"
      },
      {
        //song 8
        title: "Can't Hold Us",
        description: "Song by Macklemore",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "4",
        albumId: "5"
      },
      {
        //song 9
        title: "Same Love",
        description: "Song by Macklemore",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "4",
        albumId: "5"
      },
      {
        //song 10
        title: "Starting Over",
        description: "Song by Macklemore",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "5",
        albumId: "4"
      },
      {
        //song 11
        title: "Everlong (Acustic)",
        description: "Song by the Foo Fighters",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "5",
        albumId: "4"
      },
      {
        //song 12
        title: "Somewhere I Belong",
        description: "Song by Linking Park, Album Meteora",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "3",
        albumId: "2"
      },
      {
        //song 13
        title: "Numb",
        description: "Song by Linking Park, Album Meteora",
        url: "www.thissong.com",
        previewImage: "www.previewimg.com",
        userId: "3",
        albumId: "2"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Songs", null, {});
  }
};
