const mongoose = require("mongoose");
const app = require("./app");
const socket = require("socket.io");
const userController = require("./controller/userController");

mongoose
  .connect("mongodb://localhost:27017/notofication-asignment", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    const server = app.listen(8000, () => {
      console.log("listening on port 8000");
    });

    const io = socket(server);

    io.on("connection", function (socket) {
      socket.on("get-message-status", async function (data) {
        // query the data base an if there is new new message for a user then send true
        const areNewMessages = await userController.getNewMessages(data.userId);
        socket.emit(data.userId, { areNewMessages });
      });
    });
  })
  .catch(() => {
    console.log("error on connection");
  });
