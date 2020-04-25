// show each user
import React from "react";
import { connect } from "react-redux";
import { setTargetUser } from "../../actions";

function User({ user, setTargetUser }) {
  return (
    <div
      className="user"
      title={"send messageto " + user.userName}
      onClick={() => {
        setTargetUser({
          forUser: user._id,
          userName: user.userName,
        });
      }}
    >
      <p>user: {user.userName}</p>
    </div>
  );
}

export default connect(null, { setTargetUser })(User);
