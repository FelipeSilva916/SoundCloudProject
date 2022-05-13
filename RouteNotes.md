## User

- POST /login (Login an user)
- POST /signup (Sign-up an user)

## My -> Current User

- GET /my (Get current USER)
- GET my/albums (Get all albums by Current user)
- GET my/songs (Get all Songs by Current user)
- GET my/playlists (Get all playlists by Current user)

## Songs

- GET /songs (All songs)
- GET /songs/:songId (Details of a specific song)
- PUT songs/:songId
- DELETE /songs/:songId

## Albums

- GET /albums (All albums)
- GET /albums/:albumId (Details of specific album)
- PUT /albums/:albumsId
- DELETE /albums/:albumId
- POST /albums (Create an album)
- POST /albums/:albumId (Create a Song for an Album based on the Album's id)

## Song -> Comments

- GET /songs/:songId/comments (By song id)
- POST /songs/:songId/comments (Post comment by ID)

// comments/:commentId

- PUT /songs/:songId/:commendId
- DELETE /songs/:songId/:commendId

## Artist

- GET /artists/:artistId (Artist by ID)
- GET /artists/:artistId/songs (All songs from Artist by ID)
- GET /artists/:artistId/albums (All albums from Artist by ID)
- GET /artists/:artistId/playlist (Playlist created by Artist)

## Playlist

- POST /playlists (Create playlist)
- POST /playlists/:playlistId (Add song to playlist, by playlist ID)
- GET /playlists/:playlistId
- PUT /playlists/:playlistId (Edit playlist by ID)
- DELETE /playlists/:playlistId

## Add Query Filters to Get All Songs

- GET /songs/search
- GET /albums/search
- GET /artists/search
- GET /playlists/search

Schema
created & updated to users table
remove playlistId to playlists table
