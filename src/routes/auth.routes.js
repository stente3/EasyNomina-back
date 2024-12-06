import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controller.js";

// create router
const router = Router();

router.post("/register", register); // route for register
router.post("/login", login); // route for login
router.post("/logout", logout); // route for logout

export default router;
