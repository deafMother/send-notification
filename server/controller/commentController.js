const catchAscyn = require("../utils/catchAsync");
const Comment = require("../model/commentModel");
const User = require("../model/userModel.js");

// add a comment
exports.addComment = catchAscyn(async (req, res) => {
  const comment = await Comment.create(req.body);
  const { forUser } = req.body;
  // in the user data update newComments  to true: pending

  const user = await User.findByIdAndUpdate(
    forUser,
    {
      newComments: true,
    },
    { new: true }
  );

  console.log(user);

  res.status(200).json({
    status: "success",
    message: "comment successfully sent",
    data: {
      comment,
    },
  });
});

// get all comments for a single user
exports.getComments = catchAscyn(async (req, res) => {
  const { userId } = req.params;
  const comments = await Comment.find({ forUser: userId }).sort({ sentOn: -1 });

  // since we are sending all the comments to the user so set newCOmments in the user data to false

  await User.findByIdAndUpdate(userId, { newComments: false });

  res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});

// mark as  comment as  read, delete comments :pending
