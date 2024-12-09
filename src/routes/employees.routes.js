import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees", authRequired, getAllEmployees); // get all employees
router.post("/employee", authRequired, createEmployee); // create a new employee
router.delete("/employee", authRequired, deleteEmployee); // delete an employee
router.put("/employee", authRequired, updateEmployee); // update an employee

export default router;
