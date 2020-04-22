var app = require("express")();
var http = require("http").createServer(app);
var io = (module.exports.io = require("socket.io")(http));

const SocketManger = require("./SocketManager");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", SocketManger);

http.listen(PORT, () => {
  console.log("listening on *:" + PORT);
});
