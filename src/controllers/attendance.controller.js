import attendanceModel from "../models/attendance.model.js";

// create a new employee attendance
const createEmployeeAttendance = async (req, res) => {
  try {
    // get data from request
    const { empleado_id, fecha, horas_trabajadas, horas_extras, ausencia } =
      req.body;

    // create new employee attendance
    const newEmployeeAttendance = new attendanceModel({
      empleado_id,
      fecha,
      horas_trabajadas,
      horas_extras,
      ausencia,
    });

    // save new employee attendance
    const employeeAttendanceSaved = await newEmployeeAttendance
      .save()
      .catch((err) => {
        throw new Error("Error saving attendance: " + err.message);
      });

    // send response
    res.json(employeeAttendanceSaved);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al registrar la asistencia" });
  }
};

// show all attendances of an employee
const showEmployeeAttendances = async (req, res) => {
  try {
    // get data from request
    const { empleado_id } = req.body;

    // validate employee ID
    if (!empleado_id || typeof empleado_id !== "string") {
      throw new Error("Invalid or missing employee ID");
    }

    // find employee attendances
    const employeeAttendances = await attendanceModel.find({ empleado_id });

    // send response
    res.json(employeeAttendances);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al mostrar las asistencias" });
  }
};

// shows employee attendances of a specific period
const showEmployeeAttendancesByPeriod = async (req, res) => {
  try {
    // get data from request
    const { empleado_id, inicio, fin } = req.body;

    // validate inputs
    if (!empleado_id || typeof empleado_id !== "string") {
      throw new Error("Invalid or missing employee ID");
    }
    if (!inicio || !fin) {
      throw new Error("Invalid or missing date range");
    }

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
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Ocurrió un error al mostrar las asistencias del período",
      });
  }
};

// edit employee attendance
const editEmployeeAttendance = async (req, res) => {
  try {
    // get data from request
    const { id, fecha, horas_trabajadas, horas_extras, ausencia } = req.body;

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
        horas_extras,
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
