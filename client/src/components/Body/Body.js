import React from "react";
import { connect } from "react-redux";

import LogIn from "../Login/Login";
import UserList from "../UserList/UserList";
import Header from "../Header/Header";
import Message from "../Message/message";
import Messages from "../Message/Messages";

const MainBody = ({ loggedIn }) => {
  if (!loggedIn) {
    return <LogIn />;
  }

  return (
    <div className="container">
      <Header />
      <UserList />
      <Message />
      <Messages />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(MainBody);

// display the user list and when the box is clicked a dialog box will apear to send a message to the user
