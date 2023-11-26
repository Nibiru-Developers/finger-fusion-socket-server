import mongoose from "mongoose";
import createServer from "./server/createServer";
import Env from "./utils/Env";
import UserOnline from "./model/UserOnline";

createServer.listen(Env.PORT, async () => {
  try {
    await mongoose.connect(Env.MONGO_URI);
    console.log("Connected to MongoDB");
    await UserOnline.deleteMany();
    console.log("User Online List Refreshed");

    console.log(`Server started on port ${Env.PORT} with ${Env.NODE_ENV} environment`);
    console.log(`Visit http://localhost:${Env.PORT}`);
    console.log("Developed by Andry Pebrianto");
  } catch (error) {
    console.log(error); 
    process.exit(1);
  }
});
