import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  if (!response.ok) {
    return null;
  } else {
    const data = await response.json();
    dispatch(setUser(data));
    return response;
  }
};

const initialState = { user: null };

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/my");
  const data = await response.json();
  if (data.id) dispatch(setUser(data));
  return response;
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;

export const signup = (user) => async (dispatch) => {
  const { username, email, password, firstName, lastName } = user;
  const response = await csrfFetch("/signup", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      firstName,
      lastName
    })
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/logout", {
    method: "DELETE"
  });
  dispatch(removeUser());
  return response;
};
