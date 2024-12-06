import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

// initialize express
const app = express();

// middlewares
app.use(morgan("dev")); // morgan middleware to log requests
app.use(express.json()); // parse request body
app.use("/api", authRoutes); // mount auth routes

export default app;
