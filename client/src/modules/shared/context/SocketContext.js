import React from "react";

const SocketContext = React.createContext();

const onMessage = (evt) => {
    console.log(evt.data)
}

const SocketProvider = ({children}) => {
    let socket;

    const connect = (token) => {
        socket = new WebSocket(`ws://localhost:8000?token=${token}`)
        socket.onmessage = (evt) => onMessage(evt);
    }

    return (
        <SocketContext.Provider value={{socket, connect}}>
            {children}
        </SocketContext.Provider>
    )
}

const useSocket = () => {
    const context = React.useContext(SocketContext)
    return context;
}

export { SocketProvider, useSocket };