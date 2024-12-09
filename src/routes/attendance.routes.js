import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createEmployeeAttendance,
  showEmployeeAttendances,
  showEmployeeAttendancesByPeriod,
  editEmployeeAttendance,
  deleteEmployeeAttendance,
} from "../controllers/attendance.controller.js";

// create router
const router = Router();

router.post("/attendance", authRequired, createEmployeeAttendance);
router.get("/attendance", authRequired, showEmployeeAttendances);
router.get("/attendance/period", authRequired, showEmployeeAttendancesByPeriod);
router.put("/attendance", authRequired, editEmployeeAttendance);
router.delete("/attendance", authRequired, deleteEmployeeAttendance);

export default router;
