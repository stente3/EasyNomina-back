import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import adminModel from "../models/admin.model.js";

// create router
const router = Router();

router.post("/register", register); // route for register
router.post("/login", login); // route for login
router.post("/logout", logout); // route for logout

// route for profile
router.get("/profile", authRequired, async (req, res) => {
  // find user by id
  const userFound = await adminModel.findOne({ _id: req.user.id });

  if (!userFound) return res.status(404).json({ message: "User not found" }); // if user not found, return not found
  // send response
  return res.json({
    name: userFound.name,
    email: userFound.email,
  });
});

export default router;
