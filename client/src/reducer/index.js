import { combineReducers } from "redux";
import { userReducer, userListReducer, messageForUser } from "./userReducer";
import { LOGGED_IN, SOCKET } from "../actions/types";
import { newMessage } from "./newMessagesReducer";
import { allMessageReducer } from "./allMessageReducer";

const loggedIn = (state = false, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return action.data;
    default:
      return state;
  }
};

const socket = (state = {}, action) => {
  switch (action.type) {
    case SOCKET:
      return (state = action.data);
    default:
      return state;
  }
};

const reducer = combineReducers({
  user: userReducer,
  usersList: userListReducer,
  loggedIn,
  targetUser: messageForUser,
  socket,
  newMessage,
  messages: allMessageReducer,
});

export default reducer;
