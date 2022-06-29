import { csrfFetch } from "./csrf";

export const LOAD_SONGS = "songs/loadSongs";

const load = (list) => {
  return {
    type: LOAD_SONGS,
    list
  };
};

export const getAllSongs = () => async (dispatch) => {
  const result = await csrfFetch("/songs");

  if (result.ok) {
    const song = await result.json();
    dispatch(load(list.songs));
  }
};

const songsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_SONGS:
      const newState = { ...state };
      action.list.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
  }
};

export default songsReducer;
