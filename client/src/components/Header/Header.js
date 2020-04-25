import React from "react";
import { connect } from "react-redux";
import { subscribetoSocket, getAllMessages } from "../../actions";

const Header = ({
  loggedIn,
  user,
  subscribetoSocket,
  newMessage,
  getAllMessages,
}) => {
  if (!loggedIn) {
    return <div>Not logged in</div>;
  }
  console.log("header rendered");
  subscribetoSocket();

  return (
    <div className="header">
      welcome {user}
      <span
        // className={`${newMessage ? "notification" : ""}`}
        className="notification"
        title={`${newMessage ? "view new messages" : "all messages"}`}
        onClick={() => getAllMessages()}
      >
        {newMessage ? "!" : "m"}
      </span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    user: state.user.userName,
    newMessage: state.newMessage,
  };
};

export default connect(mapStateToProps, { subscribetoSocket, getAllMessages })(
  Header
);
