import { io } from "socket.io-client";

export function useSocket() {
  return io(process.env.NEXT_PUBLIC_SOCKETIO_HOST);
}
