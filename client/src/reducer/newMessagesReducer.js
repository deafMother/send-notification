import { NEW_MESSAGE } from "../actions/types";

export const newMessage = (state = false, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return action.data;
    default:
      return state;
  }
};
