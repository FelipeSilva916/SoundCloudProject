import { csrfFetch } from "./csrf";

export const LOAD_ALBUMS = "albums/loadAlbums";
export const SINGLE_ALBUM = "albums/singleAlbum";
export const DELETE_ALBUM = "albums/deleteAlbum";
export const UPDATE_ALBUM = "albums/updateAlbum";

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

const updateAlbum = (album) => {
  return {
    type: UPDATE_ALBUM,
    album
  };
};
//==========================================//

export const loadAlbums = () => async (dispatch) => {
  const res = await csrfFetch("/albums");

  if (res.ok) {
    const albums = await res.json();
    dispatch(loadAllAlbums(albums.Albums));
  }
};

export const getAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/albums/${albumId}`);

  if (res.ok) {
    const album = await res.json();
    dispatch(loadAlbum(album));
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

export const editAlbum = (album) => async (dispatch) => {
  const result = await csrfFetch(`/albums/${album.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(album)
  });
  if (result.ok) {
    const newAlbum = await result.json();
    dispatch(updateAlbum(newAlbum));
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

    case UPDATE_ALBUM: {
      return {
        ...state,
        [action.album.id]: action.album
      };
    }

    default:
      return state;
  }
};

export default albumsReducer;
