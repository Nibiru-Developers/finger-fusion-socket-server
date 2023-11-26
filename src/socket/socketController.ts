import { Server as SocketServer, Socket } from "socket.io";
import UserOnline from "../model/UserOnline";
import { handleLog } from "../utils/logger";

export default function socketController(
  io: SocketServer,
  socket: Socket
): void {
  addUserOnline(socket);

  socket.on("disconnect", async () => {
    try {
      await UserOnline.deleteOne({
        socketId: socket.id,
      });
      console.log(`Client with ID ${socket.id} disconnected!`);
    } catch (error) {
      handleLog("USER DISCONNECTED", error);
    }
  });
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
      console.log(`Client with ID ${socket.id} connected!`);
    }
  } catch (error) {
    handleLog("NEW USER ONLINE", error);
  }
}
