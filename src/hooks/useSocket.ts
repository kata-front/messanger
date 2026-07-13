"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (roomId: string): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.emit("join-room", roomId);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  return socket;
};

export default useSocket;