import { Server as SocketServer, Socket } from "socket.io";
import UserOnline from "../model/UserOnline";
import { handleLog } from "../utils/logger";

export default function socketController(
  io: SocketServer,
  socket: Socket
): void {
  addUserOnline(socket);
}

async function addUserOnline(socket: Socket) {
  try {
    let { userId, userName, profilePicture } = socket.handshake.query;
    userId = typeof userId === "string" ? userId : "";
    userName = typeof userName === "string" ? userName : "";
    profilePicture = typeof profilePicture === "string" ? profilePicture : "";

    const checkUserOnline = await UserOnline.findOne({ userId });

    if (!checkUserOnline) {
      await UserOnline.create({
        userId,
        userName,
        profilePicture,
        socketId: socket.id,
      });

      socket.join("global");
    }
  } catch (error) {
    handleLog("ADD NEW USER ONLINE TO USERS ONLINE COLLECTION", error);
  }
}
