"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Songs", [
      {
        //song 1
        title: "Song Demo",
        description: "The best demo-ever",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/DemoSong.wav",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/demoAlbum.jpeg",
        userId: 1,
        albumId: 1
      },
      {
        //song 2
        title: "Papercut",
        description:
          "'Papercut' is a song by American rock band Linkin Park. It was released as the fourth single from their debut album Hybrid Theory (2000), and appears as the opening track on the record.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/Papercut.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/hybridTheory.jpeg",
        userId: 3,
        albumId: 2
      },
      {
        //song 3
        title: "Crawling",
        description:
          "'Crawling' is a song by American rock band Linkin Park. It is the third single from their debut album, Hybrid Theory, and is the fifth track on the album.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/Crawling.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/hybridTheory.jpeg",
        userId: 3,
        albumId: 2
      },
      {
        //song 4
        title: "Everlong",
        description:
          "'Everlong' is a song by American rock group Foo Fighters. It was released in August 1997 as the second single from their second studio album, The Colour and the Shape (1997). ",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/Everlong.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theColourAndTheShape.jpeg",
        userId: 5,
        albumId: 4
      },
      {
        //song 5
        title: "Monkey Wrench",
        description:
          "'Monkey Wrench' is the lead single by American rock band Foo Fighters from their second album, The Colour and the Shape.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/MonkeyWrench.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theColourAndTheShape.jpeg",
        userId: 5,
        albumId: 4
      },
      {
        //song 6
        title: "My Hero",
        description:
          "'My Hero' is a song by American rock group Foo Fighters. It was released in January 1998 as the third single from their second album, The Colour and the Shape (1997).",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/MyHero.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theColourAndTheShape.jpeg",
        userId: 5,
        albumId: 4
      },
      {
        //song 7
        title: "Ten Thousand Hours",
        description:
          "???Ten Thousand Hours,??? the album's opening song, is largely based on Malcolm Gladwell's 2008 book Outliers: The Story of Success. In the book, Gladwell puts forward the ???10,000-Hour Rule.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/TenThousandHours.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theHeist.jpg",
        userId: 4,
        albumId: 5
      },
      {
        //song 8
        title: "Can't Hold Us",
        description:
          "'Can't Hold Us' is a song written and performed by American hip hop duo Macklemore & Ryan Lewis and singer Ray Dalton, originally released on August 16, 2011.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/CantHoldUs.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theHeist.jpg",
        userId: 4,
        albumId: 5
      },
      {
        //song 9
        title: "Same Love",
        description:
          "'Same Love' is a song by American hip hop duo Macklemore & Ryan Lewis, released as the third single from their 2012 debut studio album, The Heist.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/SameLove.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theHeist.jpg",
        userId: 4,
        albumId: 5
      },
      {
        //song 10
        title: "Starting Over",
        description:
          "On the The Heist's second to last track, Ben emotionally explains the sobriety he has often talked about working towards, most notably on the duo's popular track 'Otherside'.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/StartingOver.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theHeist.jpg",
        userId: 5,
        albumId: 4
      },
      {
        //song 11
        title: "Everlong (Acustic)",
        description: "Recorded at Studio 606 in Northridge, CA",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/EverlongAccustic.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/theColourAndTheShape.jpeg",
        userId: 5,
        albumId: 4
      },
      {
        //song 12
        title: "Somewhere I Belong",
        description:
          "'Somewhere I Belong' is a song by American rock band Linkin Park. It was released to US radio on February 24, 2003, as the first single from their second studio album, Meteora (2003). ",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/SomewhereIbelong.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/meteora.jpeg",
        userId: 3,
        albumId: 3
      },
      {
        //song 13
        title: "Numb",
        description:
          "'Numb' is a song by American rock band Linkin Park. It was released as the third single from their second studio album, Meteora (2003), and is the closing track on the album.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/Numb.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/meteora.jpeg",
        userId: 3,
        albumId: 3
      },
      {
        //song 14
        title: "In The End",
        description:
          "'In the End' is a song by American rock band Linkin Park. It is the eighth track on their debut album, Hybrid Theory (2000), and was released as the album's fourth and final single.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/InTheEnd.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/meteora.jpeg",
        userId: 3,
        albumId: 2
      },
      {
        //song 15
        title: "Faint",
        description:
          "'Faint' is a song by American rock band Linkin Park from their second studio album, Meteora. The song was released as the album's second single on June 9, 2003, and is the seventh track.",
        url: "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/Faint.mp3",
        previewImage:
          "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/meteora.jpeg",
        userId: 3,
        albumId: 3
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Songs", null, {});
  }
};
