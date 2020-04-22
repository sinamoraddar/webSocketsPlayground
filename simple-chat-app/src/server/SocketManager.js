const io = require("./index").io;
const { events } = require("../Events");
const { createUser } = require("../Factories");
let connectedUsers = { me: { id: "jsakdlfadjslf", name: "me" } };

const addUser = (userList, user) => {
  let newList = { ...userList, [user.name]: user };
  return newList;
};

const removeUser = (userList, username) => {
  let newList = { ...userList };
  delete newList[username];
  return newList;
};

const isUser = (userList, username) => {
  return username in userList;
};

module.exports = (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });

  socket.on(events.VERIFY_USER, (nickname, callback) => {
    console.log(nickname);
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null });
    } else {
      callback({ isUser: false, user: createUser({ name: nickname }) });
    }
  });

  socket.on(events.USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;
    io.emit(events.USER_CONNECTED, connectedUsers);
    console.log(connectedUsers);
  });
};
