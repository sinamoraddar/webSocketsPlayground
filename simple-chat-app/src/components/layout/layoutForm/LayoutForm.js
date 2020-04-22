import React, { useCallback, useState } from "react";
import { events } from "../../../Events";

const LayoutForm = ({ socket, setUser }) => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const setUserFromLayoutForm = useCallback(
    ({ user, isUser }) => {
      console.log(user, isUser);
      if (isUser) {
        setError("this username is already taken");
      } else {
        setError("");
        setUser(user);
      }
    },
    [setUser]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit(events.VERIFY_USER, nickname, setUserFromLayoutForm);
    },
    [socket, nickname, setUserFromLayoutForm]
  );
  const handleChange = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="nickname">
          <h2>Got a nickname ?</h2>
        </label>
        <input
          //   ref={(input) => (this.textInput = input)}
          type="text"
          placeholder="enter your name..."
          name="name"
          id="nickname"
          value={nickname}
          onChange={handleChange}
        />
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LayoutForm;
