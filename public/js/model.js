//Initializing socket.io
import { formatTimeStamp } from "./utils/helper.js";

const socket = io();



export const addOnMessageHandler = function (render) {
  socket.on("message", (res) => {
    const message = res.message;
    const createdAt = formatTimeStamp(res.createdAt);
    const username = res.username;

    render({ createdAt, message, username });
  });
};

export const addOnLocationMessageHandler = function (render) {
  socket.on("locationMessage", (res) => {
    const url = res.url;
    const createdAt = formatTimeStamp(res.createdAt);
    const username = res.username;

    render({ url, createdAt, username });
  });
};

export const callbackOnFormSubmit = function (message) {
  return new Promise(async (res, rej) => {
    if (message.trim() === "") return rej("Invalid empty message");

    socket.emit("sendMessage", message, (error) => {
      if (error) return rej(error);
      res();
    });
  });
};

export const callbackClickHandler = function () {
  return new Promise(async (res, rej) => {
    if (!navigator.geolocation)
      rej("Geolocation is not supported by your browser");

    const position = navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      socket.emit("sendLocation", { longitude, latitude }, (error) => {
        if (error) rej(error);
        res();
      });
    }, rej);
  });
};

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

//Options

const sideBarTemplate = document.querySelector(".sidebar_template").innerHTML;
const sidebar = document.querySelector(".sidebar");

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sideBarTemplate, {
    room,
    users,
  });
  sidebar.innerHTML = html;
});
