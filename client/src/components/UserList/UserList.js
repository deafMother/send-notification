// show list of  all the users

import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchUsers } from "../../actions";
import User from "./User";

const UserList = ({ users, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  if (users.length === 0) {
    return <h4>no users active</h4>;
  }

  return (
    <div className="user-list">
      {users.map((user) => {
        return <User user={user} key={user._id} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.usersList,
  };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
