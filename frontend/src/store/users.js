import { csrfFetch } from "./csrf";

const ALL_USERS = "users/getAllUsers";

const load = (list) => {
  return {
    type: ALL_USERS,
    list
  };
};

export const fetchUsers = () => async (dispatch) => {
  const result = await csrfFetch("/api/users");

  if (result.ok) {
    const users = await result.json();
    dispatch(load(users));
  }
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_USERS:
      let userState = { ...state };
      action.list.forEach((user) => {
        userState[user.id] = user;
      });
      return userState;
    default:
      return state;
  }
};

export default usersReducer;
