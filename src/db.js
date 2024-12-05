import { MongoClient, ServerApiVersion } from "mongodb";
import { URI } from "./config.js";

// create MongoDB client
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// connect to MongoDB
export const connectDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 }); // check if MongoDB is running by pinging the admin database
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
