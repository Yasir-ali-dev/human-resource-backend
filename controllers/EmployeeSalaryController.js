const { StatusCodes } = require("http-status-codes");
const EmployeeSalary = require("../models/EmployeeSalary");
const { BadRequestError, NotFoundError } = require("../errors");
const EmployeeInfo = require("../models/EmployeeInfo");

const getAllEmployeeSalaries = async (req, res) => {
  const employeeSalaries = await EmployeeSalary.find();
  res
    .status(StatusCodes.OK)
    .json({ employeeSalaries, length: employeeSalaries.length });
};

const createEmployeeSalary = async (req, res) => {
  const {
    employee_username,
    lastIncrementId,
    effectiveFromDate,
    creationDate,
    currentSalary,
    newSalary,
    changeAmount,
    changePercentage,
  } = req.body;
  if (!newSalary) {
    throw new BadRequestError("newSalary is required fields !");
  }
  const [employeeInfo] = await EmployeeInfo.find({
    username: employee_username,
  });
  if (!employeeInfo) {
    throw new NotFoundError(
      `employee info not found with username "${employee_username}"`
    );
  }
  const newEmployeeSalary = EmployeeSalary({
    lastIncrementId,
    effectiveFromDate,
    creationDate,
    currentSalary,
    newSalary,
    changeAmount,
    changePercentage,
  });
  newEmployeeSalary.employeeInfo = employeeInfo.username;
  await newEmployeeSalary.save();
  employeeInfo.employeeSalary.push(newEmployeeSalary);
  await employeeInfo.save();
  res.status(StatusCodes.CREATED).json({ newEmployeeSalary });
};

const getEmployeeSalary = async (req, res) => {
  const employeeSalaryId = req.params.employeeSalaryId.slice(1);
  const employeeSalary = await EmployeeSalary.findById(employeeSalaryId);
  if (!employeeSalary) {
    throw new NotFoundError(
      `employee salary not found with ${employeeSalaryId}`
    );
  }
  res.status(StatusCodes.OK).json({ employeeSalary });
};

const deleteEmployeeSalary = async (req, res) => {
  const employeeSalaryId = req.params.employeeSalaryId.slice(1);
  const deletedEmployeeSalary = await EmployeeSalary.findByIdAndDelete(
    employeeSalaryId
  );
  if (!deletedEmployeeSalary) {
    throw new NotFoundError(
      `employee salary not found with ${employeeSalaryId}`
    );
  }
  res.status(StatusCodes.OK).json({ deletedEmployeeSalary });
};

const updateEmployeeSalary = async (req, res) => {
  const employeeSalaryId = req.params.employeeSalaryId.slice(1);
  const employeeSalary = await EmployeeSalary.findById(employeeSalaryId);
  if (!employeeSalary) {
    throw new NotFoundError(
      `employee salary not found with ${employeeSalaryId}`
    );
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }
  const updateEmployeeSalaryObj = req.body;

  const updatedEmployeeSalary = await EmployeeSalary.findByIdAndUpdate(
    employeeSalaryId,
    updateEmployeeSalaryObj,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedEmployeeSalary });
};

module.exports = employeeSalary = {
  getAllEmployeeSalaries,
  createEmployeeSalary,
  getEmployeeSalary,
  deleteEmployeeSalary,
  updateEmployeeSalary,
};
