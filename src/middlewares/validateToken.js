import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// middleware to check if token is valid
export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized, you dont have any token" }); // if token is not set, return unauthorized

  // verify token
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ message: "Unauthorized, your token is invalid" }); // if token is invalid, return unauthorized

    req.user = decoded; // set user in request

    next();
  });
};
