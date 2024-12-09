import employeeModel from "../models/employee.model.js";

// create a new employee
const createEmployee = async (req, res) => {
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
  const employeeSaved = await newEmployee.save();

  // send response
  res.json(employeeSaved);
};

// delete employee
const deleteEmployee = async (req, res) => {
  // get data from request
  const { id } = req.body;
  // delete employee
  const employeeDeleted = await employeeModel.findByIdAndDelete(id);
  // send response
  res.json(employeeDeleted);
};

// update employee
const updateEmployee = async (req, res) => {
  // get data from request
  const { id } = req.body;
  // update employee
  const employeeUpdated = await employeeModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  // send new employee changes
  res.json(employeeUpdated);
};

// get all employees
const getAllEmployees = async (req, res) => {
  res.json(await employeeModel.find());
};

export { createEmployee, deleteEmployee, updateEmployee, getAllEmployees };
