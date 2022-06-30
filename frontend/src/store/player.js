export const PLAY_SONG = "player/playSong";

export const playSong = (song) => {
  return {
    type: PLAY_SONG,
    song
  };
};

let newState = {
  song: null
};

const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAY_SONG:
      newState = { ...state, song: action.song };
      return newState;
    default:
      return state;
  }
};

export default playerReducer;
