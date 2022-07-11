import { csrfFetch } from "./csrf";

export const LOAD_ALBUMS = "albums/loadAlbums";
export const SINGLE_ALBUM = "albums/singleAlbum";
export const DELETE_ALBUM = "albums/deleteAlbum";

// =========================================//

const loadAllAlbums = (list) => {
  return {
    type: LOAD_ALBUMS,
    list
  };
};

const loadAlbum = (album) => {
  return {
    type: SINGLE_ALBUM,
    album
  };
};

const removedAlbum = (id) => {
  return {
    type: DELETE_ALBUM,
    id
  };
};

//==========================================//

export const loadAlbums = () => async (dispatch) => {
  const res = await csrfFetch("/albums");

  if (res.ok) {
    const albums = await res.json();
    dispatch(loadAllAlbums(albums.Albums));
    // return res;
  }
};

export const getAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/albums/${albumId}`);

  if (res.ok) {
    const album = await res.json();
    dispatch(loadAlbum(album));
    // return album;
  }
};

export const deleteAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/albums/${albumId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    dispatch(removedAlbum(albumId));
  }
};
//=======================================//

let newState = {};

const albumsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALBUMS:
      newState = { ...state };
      action.list.forEach((album) => {
        newState[album.id] = album;
      });
      return newState;

    case SINGLE_ALBUM:
      return {
        ...state,
        [action.album.id]: action.album
      };

    case DELETE_ALBUM: {
      newState = { ...state };
      delete newState[action.id];
      return newState;
    }

    default:
      return state;
  }
};

export default albumsReducer;
