const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

// get all users
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().select({
    blockedUsers: 0,
    likedUsers: 0,
    password: 0,
  });
  res.status(200).json({
    ststus: "Success",
    data: {
      users,
    },
  });
});

// make a user, if a user exists the send the user data , the front end will only have one form for both login/create
exports.createUser = catchAsync(async (req, res, next) => {
  // first check if use exists if so the send his information

  console.log(req.body);

  let user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });

  if (user) {
    // if the use exists then send the user data
    console.log("user exists");
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
  // if user does not exists then create  a new user

  user = await User.create(req.body);
  console.log("user created");
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// get a user

// send notification
exports.getNewMessages = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId, newComments: true });
    if (user) {
      return true;
    }
    return false;
  } catch (err) {
    console.log("error fetching user info");
  }
};
