import mongoose from "mongoose";

// create employee attendance schema
const attendanceSchema = new mongoose.Schema(
  {
    empleado_id: { type: String, required: true, ref: "Employee" },
    fecha: { type: Date, required: true },
    horas_trabajadas: { type: Number, required: true },
    extras: { type: Number, default: 0 },
    ausencia: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Attendance", attendanceSchema);
