// hooks/useSocket.js
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

export function useSocket(username) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!username) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    newSocket.on('connect', () => {
      // Join with username
      newSocket.emit('user:join', { username });
    });

    newSocket.on('user:joined', () => {
      setConnected(true);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [username]);

  return { socket, connected };
}