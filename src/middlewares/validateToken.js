import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// middleware to check if token is valid
export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" }); // if token is not present in cookies, return unauthorized

  // verify token
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" }); // if token is not valid, return unauthorized

    req.user = decoded; // set user in request

    next();
  });
};
