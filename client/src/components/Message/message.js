import React, { useState } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../actions";

/*
    message format
    {
	"forUser":"5e9ff709369c153030f56aa5",
	"fromUserId":"5e9ff6f2369c153030f56aa4",
	"fromUserName":"green",
	"message":"is comment set to true"	
    }


*/

const Message = ({ targetUser, user, sendMessage }) => {
  const [message, setForm] = useState("");

  function handleChange(event) {
    setForm(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!targetUser) {
      alert("please select target user");
      return;
    }

    if (targetUser.forUser === user._id) {
      alert("cannot message self");
      return;
    }

    let form = {};
    form.fromUserName = user.userName;
    form.fromUserId = user._id;
    form.forUser = targetUser.forUser;
    form.message = message;
    sendMessage(form);
    setForm("");
  }

  return (
    <div className="message">
      <h3>
        send to:{" "}
        {targetUser ? targetUser.userName : "please select the target user"}
      </h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="message ...."
          value={message}
          onChange={handleChange}
        />
        <input type="submit" className="submit-btn" value="send" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    targetUser: state.targetUser,
    user: state.user,
  };
};

export default connect(mapStateToProps, { sendMessage })(Message);
