import http from "http";
import express, { Express, Request, Response } from "express";
import { Server as SocketServer, Socket } from "socket.io";
import socketController from "../socket/socketController";
import UserOnline from "../model/UserOnline";

const createServer: Express = express();

createServer.get("/", (req: Request, res: Response): Response<string> => {
  return res.status(200).send("Server Online!");
});

createServer.use((req: Request, res: Response): Response<string> => {
  return res.status(404).send("404 - Not Found");
});

const mainServer = http.createServer(createServer);
const io = new SocketServer(mainServer, {
  cors: {
    origin: "*",
  },
});
io.on("connection", async (socket: Socket) => {
  socket.join("global");

  // ### ADD USER TO USER ONLINE COLLECTION
  let { userId, userName, profilePicture } = socket.handshake.query;
  userId = typeof userId === "string" ? userId : "";
  userName = typeof userName === "string" ? userName : "";
  profilePicture = typeof profilePicture === "string" ? profilePicture : "";

  const checkUserOnline = await UserOnline.findOne({
    userId,
  });

  if (!checkUserOnline) {
    await UserOnline.create({
      userId,
      userName,
      profilePicture,
      socketId: socket.id,
    });
  }
  // ### ADD USER TO USER ONLINE COLLECTION

  socketController(io, socket);
});

export default mainServer;
