import { csrfFetch } from "./csrf";

export const LOAD_ALBUMS = "albums/loadAlbums";
export const SINGLE_ALBUM = "albums/singleAlbum";

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

    default:
      return state;
  }
};

export default albumsReducer;
