import { csrfFetch } from "./csrf";

export const LOAD_ALBUMS = "albums/loadAlbums";
export const SINGLE_ALBUM = "albums/singleAlbum";
export const DELETE_ALBUM = "albums/deleteAlbum";
export const UPDATE_ALBUM = "albums/updateAlbum";
export const CREATE_ALBUM = "albums/createSong";

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

const addAlbum = (album) => ({
  type: CREATE_ALBUM,
  album
});

//==========================================//

export const loadAlbums = () => async (dispatch) => {
  const res = await csrfFetch("/api/albums");

  if (res.ok) {
    const albums = await res.json();
    dispatch(loadAllAlbums(albums.Albums));
  }
};

export const getAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`);

  if (res.ok) {
    const album = await res.json();
    dispatch(loadAlbum(album));
  }
};

export const deleteAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    dispatch(removedAlbum(albumId));
  }
};

export const editAlbum = (album) => async (dispatch) => {
  const result = await csrfFetch(`/api/albums/${album.id}`, {
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

export const createAlbum = (data) => async (dispatch) => {
  const res = await csrfFetch("/api/albums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    const album = await res.json();
    dispatch(createAlbum(album));
    return album;
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

    case CREATE_ALBUM:
      return {
        ...state,
        [action.album.id]: action.album
      };
    default:
      return state;
  }
};

export default albumsReducer;
