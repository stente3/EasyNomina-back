import express from "express";
import morgan from "morgan";

// initialize express
const app = express();

// morgan middleware to log requests
app.use(morgan("dev"));
app.use(express.json());

export default app;
