import employeeModel from "../models/employee.model.js";

// create a new employee
const createEmployee = async (req, res) => {
  try {
    // get data from request
    const {
      nombre,
      documento,
      cargo,
      salario_base,
      fecha_contratacion,
      horario,
      contacto,
    } = req.body;

    // create new employee
    const newEmployee = new employeeModel({
      nombre,
      documento,
      cargo,
      salario_base,
      fecha_contratacion,
      horario,
      contacto,
    });

    // save new employee
    const employeeSaved = await newEmployee.save().catch((err) => {
      throw new Error("Error saving employee: " + err.message);
    });

    // send response
    res.json(employeeSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al crear el empleado" });
  }
};

// delete employee
const deleteEmployee = async (req, res) => {
  try {
    // get data from request
    const { id } = req.body;

    // validate id
    if (!id || typeof id !== "string") {
      throw new Error("Invalid or missing employee ID");
    }

    // delete employee
    const employeeDeleted = await employeeModel.findByIdAndDelete(id);

    // check if employee was found and deleted
    if (!employeeDeleted) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // send response
    res.json(employeeDeleted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al eliminar el empleado" });
  }
};

// update employee
const updateEmployee = async (req, res) => {
  try {
    // get data from request
    const { id } = req.body;

    // update employee
    const employeeUpdated = await employeeModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    // check if update was successful
    if (!employeeUpdated) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // send new employee changes
    res.json(employeeUpdated);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al actualizar el empleado" });
  }
};

// get all employees
const getAllEmployees = async (req, res) => {
  try {
    res.json(await employeeModel.find());
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al mostrar los empleados" });
  }
};

export { createEmployee, deleteEmployee, updateEmployee, getAllEmployees };
