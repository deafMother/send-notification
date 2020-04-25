const mongoose = require("mongoose");

const commentModel = new mongoose.Schema({
  forUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Comment id is required"],
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "from id is required"],
  },
  fromUserName: {
    type: String,
    required: [true, "from user name is required"],
  },
  message: {
    type: String,
    require: [true, "message cannot be empty"],
  },
  sentOn: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Comment = mongoose.model("Comment", commentModel);

module.exports = Comment;
