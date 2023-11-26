import { Schema, model, Document } from "mongoose";

interface UserOnlineInterface extends Document {
  userId: string;
  userName: string;
  profilePicture: string;
  socketId: string;
}

const UserOnlineSchema = new Schema<UserOnlineInterface>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  profilePicture: { type: String, required: true },
  socketId: { type: String, required: true },
});

export default model<UserOnlineInterface>("user_onlines", UserOnlineSchema);
