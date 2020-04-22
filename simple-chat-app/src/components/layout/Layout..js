import React, { useCallback, useState, useEffect } from "react";
import io from "socket.io-client";
import { events } from "../../Events";
import LayoutForm from "./layoutForm/LayoutForm";

const socketUrl = "http://127.0.0.1:4000/";
const Layout = ({ title }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const initSocket = useCallback(() => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      setIsConnected(true);
    });
    setSocket(socket);
  }, []);

  const logIn = useCallback(
    (user) => {
      socket.emit(events.USER_CONNECTED, user);
      setUser(user);
    },
    [socket]
  );
  const logOut = useCallback(() => {
    socket.emit(events.LOGOUT);
    setUser(null);
  }, [socket]);
  useEffect(() => initSocket(), [initSocket]);
  return (
    <main className="container">
      <h1>{title}</h1>
      {/* <h2>{isConnected ? "connected" : "not connected"}</h2> */}
      {/* <button onClick={initSocket}> */}
      {/* {isConnected ? "disconnect" : "connect"} */}
      {/* </button> */}
      <LayoutForm {...{ socket, setUser: logIn }} />
    </main>
  );
};

export default Layout;
