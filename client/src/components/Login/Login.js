import React, { useState } from "react";
import { connect } from "react-redux";

import { createUser } from "../../actions";

const Login = ({ createUser }) => {
  const [form, setForm] = useState({ userName: "", password: "" });

  function handleChange(event) {
    const name = event.target.name;
    setForm({ ...form, [name]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createUser(form);
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="user name"
          value={form.userName}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default connect(null, { createUser })(Login);
