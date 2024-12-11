import mongoose from "mongoose";

// create employee schema
const employeeSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    cargo: { type: String, required: true },
    salario_base: { type: Number, required: true },
    beneficios: {
      type: [
        {
          motivo: { type: String, required: true },
          cantidad: { type: Number, required: true },
          descripcion: { type: String, required: false },
        },
      ],
      default: [],
    },
    estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
    fecha_contratacion: { type: Date, required: true },
    horario: {
      tipo: { type: String, enum: ["completo", "medio"], required: true },
      horas_diarias: { type: Number, required: true },
    },
    contacto: {
      telefono: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Employee", employeeSchema);
