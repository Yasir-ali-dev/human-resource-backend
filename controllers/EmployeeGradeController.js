const { StatusCodes } = require("http-status-codes");
const EmployeeGrade = require("../models/EmployeeGrade");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllEmployeeGrades = async (req, res) => {
  const allEmployeeGrades = await EmployeeGrade.find();
  res
    .status(StatusCodes.OK)
    .json({ allEmployeeGrades, length: allEmployeeGrades.length });
};

const createEmployeeGrade = async (req, res) => {
  const { employee_grade, designation } = req.body;
  if (!employee_grade || !designation) {
    throw new BadRequestError(
      "employee_grade, designation are required fields !"
    );
  }
  const newEmployeeGrade = await EmployeeGrade.create({
    employee_grade,
    designation,
  });
  res.status(StatusCodes.CREATED).json({ newEmployeeGrade });
};

const getEmployeeGrade = async (req, res) => {
  const employeeGradeId = req.params.employeeGradeId.slice(1);
  const employeeGrade = await EmployeeGrade.findById(employeeGradeId);
  if (!employeeGrade) {
    throw new NotFoundError(`employee grade not found with ${employeeGradeId}`);
  }
  res.status(StatusCodes.OK).json({ employeeGrade });
};

const deleteEmployeeGrade = async (req, res) => {
  const employeeGradeId = req.params.employeeGradeId.slice(1);
  const deletedEmployeeGrade = await EmployeeGrade.findByIdAndDelete(
    employeeGradeId
  );
  if (!deletedEmployeeGrade) {
    throw new NotFoundError(`employee grade not found with ${employeeGradeId}`);
  }
  res.status(StatusCodes.OK).json({ deletedEmployeeGrade });
};

const updateEmployeeGrade = async (req, res) => {
  const employeeGradeId = req.params.employeeGradeId.slice(1);
  const employeeGrade = await EmployeeGrade.findById(employeeGradeId);
  if (!employeeGrade) {
    throw new NotFoundError(`employee grade not found with ${employeeGradeId}`);
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }
  const updateEmployeeGradeObj = req.body;

  const updatedEmployeeGrade = await EmployeeGrade.findByIdAndUpdate(
    employeeGradeId,
    updateEmployeeGradeObj,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedEmployeeGrade });
};

module.exports = employeeGrade = {
  getAllEmployeeGrades,
  createEmployeeGrade,
  getEmployeeGrade,
  deleteEmployeeGrade,
  updateEmployeeGrade,
};
