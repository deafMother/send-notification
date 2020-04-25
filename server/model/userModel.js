const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "name is required"],
    unique: [true, "name has to be unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  newComments: {
    type: Boolean, // when ever new comments are added towards this user this has to be set to true and then the user will fetch the comments
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
