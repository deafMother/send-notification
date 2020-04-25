import { FETCH_USER, USER_LIST, SELECT_USER } from "../actions/types";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...action.data.user };
    default:
      return state;
  }
};

export const userListReducer = (state = [], action) => {
  switch (action.type) {
    case USER_LIST:
      return [...action.users];
    default:
      return state;
  }
};

export const messageForUser = (state = null, action) => {
  switch (action.type) {
    case SELECT_USER:
      return { ...action.user };
    default:
      return state;
  }
};
