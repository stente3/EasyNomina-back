import mongoose from "mongoose";

// create payroll schema
const payrollSchema = new mongoose.Schema(
  {
    empleado_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    periodo_inicio: { type: Date, required: true },
    periodo_fin: { type: Date, required: true },
    salario_base: { type: Number, required: true },
    horas_extras: {
      type: [
        {
          tipo: { type: String, required: true }, // Ej: "diurna", "nocturna", "festiva"
          cantidad: { type: Number, required: true },
          total_pago: { type: Number, required: true },
        },
      ],
      default: [],
    },
    deducciones: {
      type: [
        {
          motivo: { type: String, required: true },
          monto: { type: Number, required: true },
        },
      ],
      default: [],
    },
    beneficios: {
      type: [
        {
          motivo: { type: String, required: true },
          monto: { type: Number, required: true },
        },
      ],
      default: [],
    },
    total_pago: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Payroll", payrollSchema);
