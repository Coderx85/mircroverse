import mongoose from "mongoose";
import { config } from "../config.js";

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(config.MONGOOSE_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
