//Importing
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const WordsFilter = require("bad-words");
const express = require("express");
const { generateMessage } = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/user.js");

//Setting up express and socketio
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Variable declarations
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

const filter = new WordsFilter();

//Listening for events

io.on("connection", (socket) => {
  handleEvents(socket);
});

server.listen(port, () => {
  console.log("Server started on port 3000");
});

//Handling Events

const handleEvents = function (socket) {
  socket.on("sendLocation", (latlng, callback) => {
    const user = getUser(socket.id);
    const url = `https://www.google.com/maps?q=${latlng.latitude},${latlng.longitude}`;
    io.to(user.room).emit(
      "locationMessage",
      generateMessage({ username: user.username, url })
    );

    callback();
  });

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("message", generateMessage({ message: "Welcome" }));

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage({ message: `${user.username} has joined` })
      );

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    })

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (filter.isProfane(message)) return callback("Profanity is not allowed");
    io.to(user.room).emit(
      "message",
      generateMessage({ username: user.username, message })
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage({ message: `${user.username} has left the channel` })
      );
      io.to(user.room).emit('roomData', {
        room: user.room,
        user: getUsersInRoom(user.room)
      })
    }
  });
};
