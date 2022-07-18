# SoundCloud Project

SoundCloud Clone is an application created to imitate SoundCloud.
A user can log in as a 'Demo' user or create an account.

Login, explore, and listen at [SoundCloud Clone](https://soundcloudcloneapp.herokuapp.com/)

## Landing Page View:

![SoundCloud Landing Page View](./images/landingPage.png)

## Home View:

![Home Screen View](./images/homeScreen.png)

## Songs Collections:

![All Songs Collections View](./images/allSongs.png)

## Album Collections:

![All Albums Collections View](./images/allAlbums.png)

## Technologies:

This application was created with the use of:

- Express
- Node JS
- React
- Sequelize
- Csurf JS
- BCrypt JS
- Redux
- Amazon AWS S3
- React H5 Audio Player
- SQLite3
- Postgres

## Features

- Sign-up, log in with your account, and log in with a 'Demo Account.'
- Create, read, update, and delete **Songs** (CRUD).
- Create, read, update, and delete **Albums** (CRUD).
- Upload the image and audio file to the song.
- Upload an image for an album cover to the album.
- If no image is selected, the default image is given.
- Search bar navigates user to the current song details.
- Navigate through the application with uninterrupted audio playback.

## Technical Implementation Details:

SoundCloud Clone is a single page application.
SoundCLoud Clone allows the user to edit and delete their songs and albums. It uses the following logic to verify the user's credentials:

```
  let userManipulateButton;

  if (song?.userId === user?.id) {
    userManipulateButton = (
      <div className="user-buttons">
        <div>
          <EditSongModal song={songId} />
        </div>
        <div className="user-delete-button">
          <DeleteSongButton songId={songId} />
        </div>
      </div>
    );
  }
```

## To-Do:

- [ ] Playlists
- [ ] Comments
- [ ] Current user profile page
- [ ] Current user songs and albums
- [ ] Comments
- [ ] Likes
- [ ] Follows
- [ ] Improve search bar

[Original Design Docs](https://github.com/FelipeSilva916/SoundCloudProject/wiki/Soundcloud-Clone-Original-Design-Docs)
