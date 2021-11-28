import React, { useState } from "react";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  var socket;

  let [socketState, setSocketState] = useState('disconnected')
  const user = localStorage.getItem('user')

  const onMessage = (evt) => {
    console.log("Received message!")
  };

  const onClose = (evt) => {
    console.log('Socket closed!')
  }

  const onOpen = (evt) => {
    console.log('Connected!')
  }

  const onError = (evt) => {
    console.log('Socket closed! Reconnecting.....')
    setInterval(() => reconnect(), 5000)
  }

  const reconnect = () => {
    connect();
  }

  const disconnect = () => {
    socket.close();
    console.log('Disconnected!')
  }

  const connect = (token) => {
    socket = new WebSocket(`ws://localhost:8000?token=${token}`);
    socket.onopen = (evt) => onOpen(evt);
    socket.onmessage = (evt) => onMessage(evt);
    socket.onclose = (evt) => onClose(evt);
    socket.onError = (evt) => onError(evt);
  };

  if(localStorage.getItem("user")) {
      connect(JSON.parse(user).access)
  }

  return (
    <SocketContext.Provider
      value={{ connect, disconnect }}
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
