import axios from "../api";
import {
  FETCH_USER,
  LOGGED_IN,
  USER_LIST,
  SELECT_USER,
  SOCKET,
  NEW_MESSAGE,
  ALL_MESSAGES,
} from "./types";
import openSocket from "socket.io-client";

export const createUser = (form) => async (dispatch, getState) => {
  try {
    const response = await axios.post("/user", form);
    dispatch({
      type: FETCH_USER,
      data: {
        user: response.data.data.user,
      },
    });
    dispatch({
      type: LOGGED_IN,
      data: true,
    });
  } catch (err) {
    // only is case of some failure at the back end will i get an error
    console.log("server error please try later");
    dispatch({
      type: LOGGED_IN,
      data: false,
    });
  }
};

// fetch user lists

export const fetchUsers = () => async (dispatch, getState) => {
  const users = await axios.get("/user");

  dispatch({
    type: USER_LIST,
    users: users.data.data.users,
  });
};

// select target user
export const setTargetUser = (targetUser) => {
  return {
    type: SELECT_USER,
    user: targetUser,
  };
};

// send message

export const sendMessage = (message) => async (dispatch, getState) => {
  try {
    await axios.post("/comment", message);
    alert("message sent successfully");
  } catch (error) {
    alert("error sending message");
  }
};

//  subscribt to socket, when the user is logged in

export const subscribetoSocket = () => async (dispatch) => {
  const socket = openSocket("http://localhost:8000");
  console.log("connected to server");
  dispatch({
    type: SOCKET,
    data: socket,
  });
  dispatch(listenForLikes());
  dispatch(emitLike());
};

// emit request for new messages every 2000ms
export const emitLike = () => async (dispathc, getState) => {
  const socket = getState().socket;
  const userId = getState().user._id;
  const userName = getState().user.userName;

  setInterval(() => {
    socket.emit("get-message-status", {
      userId,
      userName,
    });
  }, 2000);
};

//  only logged users can listen for new messages, this listener will be fired once after
export const listenForLikes = () => async (dispatch, getState) => {
  console.log("listening to responses from socket");
  const socket = getState().socket;
  const userId = getState().user._id;
  socket.on(userId, function (data) {
    const { areNewMessages } = data;
    dispatch({
      type: NEW_MESSAGE,
      data: areNewMessages,
    });
  });
  // if there are new messages then set new messages state to true, and show an alert when that alert is clicked then
  // show all the messages and set newComments in the database to false then set the newMessages state to false
};

// fetch all messages

export const getAllMessages = () => async (dispatch, getState) => {
  const userId = getState().user._id;

  // 1) fet all mesasges aand set newComments in the database to false
  const messages = await axios.get(`/comment/${userId}`);

  dispatch({
    type: ALL_MESSAGES,
    data: messages.data.data.comments,
  });

  // 2) ser newMessages state to false
  dispatch({
    type: NEW_MESSAGE,
    data: false,
  });
};
