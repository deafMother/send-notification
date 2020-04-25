import React from "react";
import { connect } from "react-redux";

const Messages = ({ messages }) => {
  if (messages.length === 0) {
    return <div></div>;
  }

  return (
    <div className="messages">
      <h3>messages</h3>
      {messages.map((message) => {
        return (
          <div className="message-from" key={message._id}>
            <p> from: {message.fromUserName}</p>
            <p> message: {message.message}</p>
            <p> sent on: {new Date(message.sentOn).toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(Messages);
