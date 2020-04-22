const uuidv4 = require("uuid/v4");

const createUser = ({ name = "" } = {}) => ({ name, id: uuidv4() });
const createMessage = ({ message = "", sender = "" } = {}) => ({
  id: uuidv4(),
  time: new Date(Date.now()),
  message,
  sender,
});

const getTime = (date) =>
  `${date().getHours()}:${("0" + date().getMinutes()).slice(-2)}`;

const createChat = ({
  messages = [],
  name = "Community",
  users = [],
} = {}) => ({
  id: uuidv4(),
  messages,
  name,
  users,
  typingUsers: [],
});
module.exports = { createChat, getTime, createUser, createMessage };
