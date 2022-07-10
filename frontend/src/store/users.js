import { csrfFetch } from "./csrf";

const ALL_USERS = "users/getAllUsers";

export const getAllUsers = (users) => {
  return {
    type: ALL_USERS,
    users
  };
};

export const fetchUsers = () => async (dispatch) => {
  const result = await csrfFetch("/api/users");

  if (result.ok) {
    const users = await result.json();
    dispatch(getAllUsers(users));
  }
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_USERS:
      let userState = { ...state };
      action.payload.forEach((user) => {
        userState[user.id] = user;
      });
      return userState;
    default:
      return state;
  }
};

export default usersReducer;
