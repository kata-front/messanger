import { io, Socket } from "socket.io-client";

class SocketManager {
  private static instance: Socket | null = null;

  public static getInstance() {
    if (!this.instance) {
      this.instance = io()
    }
    return this.instance;
  }
}

export const useSocket = () => SocketManager.getInstance();
