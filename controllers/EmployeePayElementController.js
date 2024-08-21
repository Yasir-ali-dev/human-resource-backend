const { StatusCodes } = require("http-status-codes");
const EmployeePayElement = require("../models/EmployeePayElement");

const { BadRequestError, NotFoundError } = require("../errors");
const EmployeeInfo = require("../models/EmployeeInfo");

const getEmployeePayElements = async (req, res) => {
  const employeePayElement = await EmployeePayElement.find();
  res
    .status(StatusCodes.OK)
    .json({ employeePayElement, length: employeePayElement.length });
};

const createEmployeePayElement = async (req, res) => {
  const {
    element_type,
    employee_username,
    processing_type,
    entry_type,
    start_date,
    end_date,
  } = req.body;
  if (!element_type || !start_date || !end_date) {
    throw new BadRequestError(
      "element_type start_date, end_date are required fields !"
    );
  }
  const newPayElement = EmployeePayElement({
    element_type,
    processing_type,
    entry_type,
    start_date,
    end_date,
  });

  const [employeeInfo] = await EmployeeInfo.find({
    username: employee_username,
  });
  employeeInfo.employeePayElement.push(newPayElement);
  await employeeInfo.save();
  newPayElement.employeeInfo = employeeInfo._id;
  await newPayElement.save();
  res.status(StatusCodes.CREATED).json({ newPayElement });
};

const getEmployeePayElement = async (req, res) => {
  const payElementId = req.params.payElementId.slice(1);
  const employeePayElement = await EmployeePayElement.findById(payElementId);
  if (!employeePayElement) {
    throw new NotFoundError(
      `employee pay element not found with ${payElementId}`
    );
  }
  res.status(StatusCodes.OK).json({ employeePayElement });
};

const deleteEmployeePayElement = async (req, res) => {
  const payElementId = req.params.payElementId.slice(1);

  const deletedEmployeePayElement = await EmployeePayElement.findByIdAndDelete(
    payElementId
  );
  if (!deletedEmployeePayElement) {
    throw new NotFoundError(
      `employee pay element not found with ${payElementId}`
    );
  }
  res.status(StatusCodes.OK).json({ deletedEmployeePayElement });
};

const updateEmployeePayElement = async (req, res) => {
  const payElementId = req.params.payElementId.slice(1);
  const { end_date, start_date, entry_type } = req.body;
  const employeePayElement = await EmployeePayElement.findById(payElementId);
  if (!employeePayElement) {
    throw new NotFoundError(
      `employee pay element not found with ${payElementId}`
    );
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }

  const updatedEmployeePayElement = await EmployeePayElement.findByIdAndUpdate(
    payElementId,
    { end_date, start_date, entry_type },
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedEmployeePayElement });
};

module.exports = employeePayElement = {
  getEmployeePayElements,
  createEmployeePayElement,
  getEmployeePayElement,
  deleteEmployeePayElement,
  updateEmployeePayElement,
};
