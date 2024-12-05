import express from "express";
import morgan from "morgan";

// initialize express
const app = express();

// middlewares
app.use(morgan("dev")); // morgan middleware to log requests
app.use(express.json()); // parse request body

export default app;
