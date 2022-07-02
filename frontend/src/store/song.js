import { csrfFetch } from "./csrf";

export const LOAD_SONGS = "songs/loadSongs";
export const LOAD_SONG = "songs/loadSong";
export const DELETE_SONG = "songs/deleteSong";
export const UPDATE_SONG = "songs/updateSong";
export const CREATE_SONG = "songs/createSong";

//==================================================
const load = (list) => {
  return {
    type: LOAD_SONGS,
    list
  };
};

const loadSong = (song) => {
  return {
    type: LOAD_SONG,
    song
  };
};

const removedSong = (id) => {
  return {
    type: DELETE_SONG,
    id
  };
};

const updateSong = (song) => {
  return {
    type: UPDATE_SONG,
    song
  };
};

const addSong = (song) => ({
  type: CREATE_SONG,
  song
});

//==================================================

export const createSong = (data) => async (dispatch) => {
  const res = await csrfFetch("/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    const song = await res.json();
    dispatch(addSong(song));

    return song;
  }
};

export const getAllSongs = () => async (dispatch) => {
  const result = await csrfFetch("/songs");

  if (result.ok) {
    const list = await result.json();
    dispatch(load(list.Songs));
  }
};

export const getSong = (songId) => async (dispatch) => {
  const result = await csrfFetch(`/songs/${songId}`);

  if (result.ok) {
    const song = await result.json();
    dispatch(loadSong(song));
  }
};

export const deleteSong = (id) => async (dispatch) => {
  const result = await csrfFetch(`/songs/${id}`, {
    method: "DELETE"
  });

  if (result.ok) {
    dispatch(removedSong(id));
  }
};

export const editSong = (data) => async (dispatch) => {
  const result = await csrfFetch(`/songs/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (result.ok) {
    const song = await result.json();
    dispatch(updateSong(song));
  } //return result here?
};

//===================================================
let newState = {};

const songsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SONGS:
      newState = { ...state };
      action.list.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;

    case LOAD_SONG:
      return {
        ...state,
        [action.song.id]: action.song
      };

    case DELETE_SONG: {
      newState = { ...state };
      delete newState[action.id];
      return newState;
    }

    case UPDATE_SONG: {
      return {
        ...state,
        [action.song.id]: action.song
      };
    }

    case CREATE_SONG:
      return {
        ...state,
        [action.song.id]: action.song
      };

    default:
      return state;
  }
};

export default songsReducer;
