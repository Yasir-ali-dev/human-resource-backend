const { StatusCodes } = require("http-status-codes");
const EmployeeType = require("../models/EmployeeType");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllEmployeeTypes = async (req, res) => {
  const allEmployeeTypes = await EmployeeType.find();
  res
    .status(StatusCodes.OK)
    .json({ allEmployeeTypes, length: allEmployeeTypes.length });
};

const createEmployeeType = async (req, res) => {
  const { employeeType, designation, is_active } = req.body;
  if (!employeeType || !designation) {
    throw new BadRequestError(
      "employeeType, designation are required fields !"
    );
  }
  const newEmployeeType = await EmployeeType.create({
    employeeType,
    designation,
    is_active,
  });
  res.status(StatusCodes.CREATED).json({ newEmployeeType });
};

const getEmployeeType = async (req, res) => {
  const employeeTypeId = req.params.employeeTypeId.slice(1);
  const employeeType = await EmployeeType.findById(employeeTypeId);
  if (!employeeType) {
    throw new NotFoundError(`employeeInfo not found with ${employeeType}`);
  }

  res.status(StatusCodes.OK).json({ employeeType });
};

const deleteEmployeeType = async (req, res) => {
  const employeeTypeId = req.params.employeeTypeId.slice(1);
  const deletedEmployeeType = await EmployeeType.findByIdAndDelete(
    employeeTypeId
  );
  if (!deletedEmployeeType) {
    throw new NotFoundError(`employee type not found with ${employeeTypeId}`);
  }
  res.status(StatusCodes.OK).json({ deletedEmployeeType });
};

const updateEmployeeType = async (req, res) => {
  const employeeTypeId = req.params.employeeTypeId.slice(1);
  const employeeType = await EmployeeType.findById(employeeTypeId);

  if (!employeeType) {
    throw new NotFoundError(`employee type not found with ${employeeTypeId}`);
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }
  const updateEmployeeTypeObj = req.body;

  const updatedEmployeeType = await EmployeeType.findByIdAndUpdate(
    employeeTypeId,
    updateEmployeeTypeObj,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedEmployeeType });
};

module.exports = employeeType = {
  getAllEmployeeTypes,
  createEmployeeType,
  getEmployeeType,
  deleteEmployeeType,
  updateEmployeeType,
};
