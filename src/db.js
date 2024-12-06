import mongoose from "mongoose";
import { URI, DB_NAME } from "./config.js";

// database connection
export const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      dbName: DB_NAME,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connection to MongoDB established");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Finish the process
  }
};
