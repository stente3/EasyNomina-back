import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";

// initialize express
const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // allow cookies
  }),
); // enable cors
app.use(morgan("dev")); // morgan middleware to log requests
app.use(express.json()); // parse request body
app.use(cookieParser()); // parse cookies
app.use("/api", authRoutes); // mount auth routes
app.use("/api", employeesRoutes); // mount employees routes

export default app;
