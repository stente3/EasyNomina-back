import payrollModel from "../models/payroll.model.js";
import employeeModel from "../models/employee.model.js";
import attendanceModel from "../models/attendance.model.js";

// create payroll of an employee
const createPayroll = async (req, res) => {
  try {
    const {
      empleado_id,
      periodo_inicio,
      periodo_fin,
      deducciones,
      beneficios,
    } = req.body;

    // Verificar si el empleado existe
    const empleado = await employeeModel.findById(empleado_id);
    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // Obtener el salario base del empleado
    const salario_base = empleado.salario_base;

    // Agregar los beneficios del empleado al arreglo de beneficios proporcionado
    const beneficiosCompletos = [
      ...empleado.beneficios.map((b) => ({
        motivo: b.motivo,
        monto: b.cantidad,
        descripcion: b.descripcion || null,
      })),
      ...beneficios, // Beneficios específicos proporcionados en esta nómina
    ];

    // Calcular el total de beneficios
    const totalBeneficios = beneficiosCompletos.reduce(
      (acc, beneficio) => acc + beneficio.monto,
      0,
    );

    // Obtener las horas extras del empleado en el rango de fechas
    const asistencias = await attendanceModel.find({
      empleado_id: empleado_id,
      fecha: { $gte: new Date(periodo_inicio), $lte: new Date(periodo_fin) },
    });

    const horasExtras = asistencias.flatMap(
      (asistencia) => asistencia.horas_extras,
    );
    const totalHorasExtras = horasExtras.reduce(
      (acc, extra) => acc + extra.total_pago,
      0,
    );

    // Calcular el total de deducciones proporcionadas en la nómina
    const totalDeducciones = deducciones.reduce(
      (acc, deduccion) => acc + deduccion.monto,
      0,
    );

    // Calcular el total a pagar
    const total_pago =
      salario_base + totalBeneficios + totalHorasExtras - totalDeducciones;

    // Crear la nómina
    const nuevaNomina = new payrollModel({
      empleado_id,
      periodo_inicio,
      periodo_fin,
      salario_base,
      horas_extras: horasExtras,
      deducciones,
      beneficios: beneficiosCompletos,
      total_pago,
    });

    // Guardar la nómina en la base de datos
    await nuevaNomina.save();

    res
      .status(201)
      .json({ message: "Nómina creada exitosamente", payroll: nuevaNomina });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al crear la nómina" });
  }
};

// show all payrolls of employee
const showAllPayrolls = async (req, res) => {
  try {
    const { empleado_id } = req.body;
    // Verificar si el empleado existe
    const empleado = await employeeModel.findById(empleado_id);

    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // Buscar todas las nóminas del empleado
    const payrolls = await payrollModel.find({ empleado_id });

    // Verificar si hay nóminas
    if (!payrolls.length) {
      return res.status(404).json({ error: "No se encontraron nóminas" });
    }
    res.status(200).json(payrolls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al mostrar las nóminas" });
  }
};

// delete payroll
const deletePayroll = async (req, res) => {
  try {
    const { id } = req.body;
    // Verificar si el empleado existe
    const payroll = await payrollModel.findById(id);
    if (!payroll) {
      return res.status(404).json({ error: "Nómina no encontrada" });
    }

    // Eliminar la nómina
    await payroll.deleteOne();

    res.status(200).json({ message: "Nómina eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al eliminar la nómina" });
  }
};

export { createPayroll, showAllPayrolls, deletePayroll };
