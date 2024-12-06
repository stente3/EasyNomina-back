import mongoose from "mongoose";

// create admin schema
const administradorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model(
  "Administrador",
  administradorSchema,
  "administrador",
);
