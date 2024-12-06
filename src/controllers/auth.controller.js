import adminModel from "../models/administrador.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

// register controller
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // hash password with bcrypt
    const passwordHashed = await bcrypt.hash(password, 10);

    // create new admin
    const newAdmin = new adminModel({ name, email, password: passwordHashed });

    // save new admin
    const userSaved = await newAdmin.save();

    // create access token
    const token = await createAccessToken({ id: userSaved._id });

    // set cookie
    res.cookie("token", token);

    // send response
    res.json({ id: userSaved._id, name: userSaved.name });
  } catch (error) {
    // send error
    res.status(500).json({ message: error.message });
  }
};

// login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const userFound = await adminModel.findOne({ email });

    // check if user was found
    if (!userFound) return res.status(404).json({ message: "User not found" });

    // check if password match
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    // check if password match
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid password" });

    // create access token
    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    // send response
    res.json({ id: userFound._id, name: userFound.name });
  } catch (error) {
    // send error
    res.status(500).json({ message: error.message });
  }
};

// logout controller
const logout = (req, res) => {
  // clear cookie
  res.clearCookie("token");
  // send response
  res.json({ message: "Logged out" });
};

export { login, register, logout };
