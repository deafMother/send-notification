import { ALL_MESSAGES } from "../actions/types";

export const allMessageReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_MESSAGES:
      return [...action.data];
    default:
      return state;
  }
};
