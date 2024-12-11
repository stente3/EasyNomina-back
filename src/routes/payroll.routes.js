import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createPayroll,
  showAllPayrolls,
  deletePayroll,
} from "../controllers/payroll.controller.js";

const router = Router();

router.post("/payroll", authRequired, createPayroll); // create payroll of an employee
router.get("/payrolls", authRequired, showAllPayrolls); // show all payrolls of employee
router.delete("/payroll", authRequired, deletePayroll); // delete payroll

export default router;
