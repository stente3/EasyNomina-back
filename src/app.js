import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

// initialize express
const app = express();

// middlewares
app.use(morgan("dev")); // morgan middleware to log requests
app.use(express.json()); // parse request body
app.use(cookieParser()); // parse cookies
app.use("/api", authRoutes); // mount auth routes

export default app;
