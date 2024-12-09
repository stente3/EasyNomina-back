import attendanceModel from "../models/attendance.model.js";

// create a new employee attendance
const createEmployeeAttendance = async (req, res) => {
  // get data from request
  const { empleado_id, fecha, horas_trabajadas, extras, ausencia } = req.body;

  // create new employee attendance
  const newEmployeeAttendance = new attendanceModel({
    empleado_id,
    fecha,
    horas_trabajadas,
    extras,
    ausencia,
  });
  // save new employee attendance
  const employeeAttendanceSaved = await newEmployeeAttendance.save();
  // send response
  res.json(employeeAttendanceSaved);
};

// show all attendances of an employee
const showEmployeeAttendances = async (req, res) => {
  // get data from request
  const { empleado_id } = req.body;

  // find employee attendances
  const employeeAttendances = await attendanceModel.find({ empleado_id });

  // send response
  res.json(employeeAttendances);
};

// shows employee attendances of a specific period
const showEmployeeAttendancesByPeriod = async (req, res) => {
  // get data from request
  const { empleado_id, inicio, fin } = req.body;

  // find employee attendances
  const employeeAttendances = await attendanceModel.find({
    empleado_id,
    fecha: {
      $gte: new Date(inicio),
      $lte: new Date(fin),
    },
  });

  // send response
  res.json(employeeAttendances);
};

// edit employee attendance
const editEmployeeAttendance = async (req, res) => {
  try {
    // get data from request
    const { id, fecha, horas_trabajadas, extras, ausencia } = req.body;

    // search for employee attendance
    const employeeAttendance = await attendanceModel.findById(id);

    // verify if the attendance was found
    if (!employeeAttendance) {
      return res.status(404).json({ message: "Asistencia no encontrada" });
    }

    // update attendance
    const employeeAttendanceUpdated = await employeeAttendance.updateOne({
      $set: {
        fecha,
        horas_trabajadas,
        extras,
        ausencia,
      },
    });

    // search for updated attendance
    const updatedAttendance = await attendanceModel.findById(id);

    // send response
    res.json({
      message: "La siguiente asistencia ha sido actualizada",
      employeeAttendanceUpdated,
      message: "Asistencia actualizada correctamente",
      updatedAttendance, // Documento actualizado
    });
  } catch (error) {
    // error handling
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la asistencia" });
  }
};

// delete employee attendance
const deleteEmployeeAttendance = async (req, res) => {
  try {
    // get data from request
    const { id } = req.body;

    // search for employee attendance
    const employeeAttendance = await attendanceModel.findById(id);

    // verify if the attendance was found
    if (!employeeAttendance) {
      return res.status(404).json({ message: "Asistencia no encontrada" });
    }

    // delete attendance
    const employeeAttendanceDeleted = await employeeAttendance.deleteOne();

    // send response
    res.json({
      message: "Asistencia eliminada correctamente",
    });
  } catch (error) {
    // error handling
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la asistencia" });
  }
};

export {
  createEmployeeAttendance,
  showEmployeeAttendances,
  showEmployeeAttendancesByPeriod,
  editEmployeeAttendance,
  deleteEmployeeAttendance,
};
