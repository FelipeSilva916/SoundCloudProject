## User

- GET /users/:id (Get current USER)
- POST /login (Login an user)
- POST /signup (Sign-up an user)

## My

- GET my/albums (Get all albums by Current user)
- GET my/songs (Get all Songs by Current user)
- GET my/playlist (Get all playlists by Current user)

## Songs

- GET /songs (All songs)
- GET /songs/:songId (Details of a specific song)
- PUT/PATCH songs/:songId
- DELETE /songs/:songId

## Albums

- GET /albums (All albums)
- GET /albums/:albumId (Details of specific album)
- PUT/PATCH /albums/:albumsId
- DELETE /albums/:albumId
- POST /albums (Create an album)
- POST /albums/:albumId (Create a Song for an Album based on the Album's id)

## Song -> Comments

- GET /songs/:songId/comments (By song id)
- POST /songs/:songId/comments (Post comment by ID)
- PUT/PATCH /songs/:songId/:commendId
- DELETE /songs/:songId/:commendId

## Artist

- GET /artists/:artistId (Artist by ID)
- GET /artist/:artistId/songs (All songs from Artist by ID)
- GET /artists/:artistId/albums (All albums from Artist by ID)
- GET /artists/:artistId/playlist (Playlist created by Artist)

## Playlist

- POST /playlists (Create playlist)
- POST /playlists/:playlistId (Add song to playlist, by playlist ID)
- GET /playlist/:playlistId
- PUT/PATCH /playlist/:playlistId (Edit playlist by ID)
- DELETE /playlist/:playlistId

## Add Query Filters to Get All Songs

- GET /songs/search
- GET /albums/search
- GET /artists/search
- GET /playlists/search
