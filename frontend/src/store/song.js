import { csrfFetch } from "./csrf";

export const LOAD_SONGS = "songs/loadSongs";
export const LOAD_SONG = "songs/loadSong";
export const DELETE_SONG = "songs/deleteSong";
export const UPDATE_SONG = "songs/updateSong";

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

const removedSong = (song) => {
  return {
    type: DELETE_SONG,
    song
  };
};

const updateSong = (song) => {
  return {
    type: UPDATE_SONG,
    song
  };
};
//==================================================

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

export const deleteSong = (songId) => async (dispatch) => {
  const result = await csrfFetch(`/songs/${songId}`, {
    method: "DELETE"
  });

  if (result.ok) {
    const song = await result.json();
    dispatch(removedSong(song));
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
  }
};
//return result here?

//===================================================

const songsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SONGS:
      const newState = { ...state };
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
      const newState = { ...state };
      delete newState[action.song.id];
      return newState;
    }

    default:
      return state;
  }
};

export default songsReducer;
