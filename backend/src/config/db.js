import mongoose from "mongoose";
import config from "./config.js";

export async function connectDB() {
  if (!config.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables.");
  }

  await mongoose.connect(config.MONGO_URI);
  console.log("MongoDB connected successfully");
}

export default connectDB;