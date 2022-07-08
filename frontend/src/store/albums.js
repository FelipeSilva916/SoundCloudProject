import { csrfFetch } from "./csrf";

const LOAD_ALBUM = "albums/loadAlbum";

// =========================================//

const loadAllAlbums = (albums) => {
  return {
    type: LOAD_ALBUM,
    albums
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

//=======================================//

let newState = {};

const albumsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALBUM:
      newState = { ...state };
      action.albums.forEach((album) => {
        newState[album.id] = album;
      });
      return newState;

    default:
      return state;
  }
};
