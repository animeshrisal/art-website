import React, { useState } from "react";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  let socket;
  let [notification, setNotification] = useState(false);

  const user = localStorage.getItem('user')

  const onMessage = (evt) => {
    setNotification(true);
  };

  const closeNotification = () => {
    setNotification(false);
  };

  const connect = (token) => {
    socket = new WebSocket(`ws://localhost:8000?token=${token}`);
    socket.onmessage = (evt) => onMessage(evt);
  };


  if(localStorage.getItem("user")) {
      connect(JSON.parse(user).access)
  }


  return (
    <SocketContext.Provider
      value={{ socket, notification, connect, closeNotification }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const context = React.useContext(SocketContext);
  return context;
};

export { SocketProvider, useSocket };
