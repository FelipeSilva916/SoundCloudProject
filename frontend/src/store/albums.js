import { csrfFetch } from "./csrf";

const LOAD_ALBUMS = "albums/loadAlbums";
const SINGLE_ALBUM = "albums/singleAlbum";

// =========================================//

const loadAllAlbums = (albums) => {
  return {
    type: LOAD_ALBUMS,
    albums
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
    dispatch(loadAllAlbums(albums));
    return res;
  }
};

export const getAlbum = (id) => async (dispatch) => {
  const res = await csrfFetch(`/albums/${id}`);
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
      action.albums.forEach((album) => {
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
