// SocketContext.js
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();
  const [shareListenning, setShareListenning] = useState(false);

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = io('http://localhost:3000'); 
    console.log('socketRef', socketRef)
    // Clean up the socket connection when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocketContext() {
    return useContext(SocketContext);
}
