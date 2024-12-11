import mongoose from "mongoose";

// create employee attendance schema
// TODO: cambiar la forma en la que se llenan las horas extras para que se parezca a como se hace en el modelo de payroll y con ello llenar automativamente las horas extras en el payroll
const attendanceSchema = new mongoose.Schema(
  {
    empleado_id: { type: String, required: true, ref: "Employee" },
    fecha: { type: Date, required: true },
    horas_trabajadas: { type: Number, required: true },
    horas_extras: {
      type: [
        {
          tipo: { type: String, required: true }, // Ej: "diurna", "nocturna", "festiva"
          cantidad: { type: Number, required: true },
          description: { type: String, required: false },
          total_pago: { type: Number, required: true },
        },
      ],
      default: [],
    },
    ausencia: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Attendance", attendanceSchema);
