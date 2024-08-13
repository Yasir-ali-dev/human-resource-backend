const { StatusCodes } = require("http-status-codes");
const EmployeeInfo = require("../models/EmployeeInfo");
const { BadRequestError, NotFoundError } = require("../errors");
const getAllEmployeesInfo = async (req, res) => {
  const allEmployeesInfo = await EmployeeInfo.find({});
  res
    .status(StatusCodes.OK)
    .json({ allEmployeesInfo, length: allEmployeesInfo.length });
};

const createEmployeeInfo = async (req, res) => {
  const {
    username,
    email,
    name,
    role,
    status,
    report_to,
    shift,
    date_of_birth,
    martial_status,
    state,
    city,
    zip_code,
    work_phone,
    personal_email,
    nationality,
    gender,
    address,
    country,
    mobile,
    home_phone,
  } = req.body;
  if (
    !username ||
    !email ||
    !name ||
    !role ||
    !status ||
    !report_to ||
    !shift ||
    !martial_status ||
    !gender
  ) {
    throw new BadRequestError(
      "username, email, name, role,status, report_to, shift, martial_status and gender are required fields !"
    );
  }
  const newEmployeeInfo = await EmployeeInfo.create({
    username,
    email,
    name,
    role,
    status,
    report_to,
    shift,
    date_of_birth,
    martial_status,
    state,
    city,
    zip_code,
    work_phone,
    personal_email,
    nationality,
    gender,
    address,
    country,
    mobile,
    home_phone,
  });
  res.status(StatusCodes.CREATED).json({ newEmployeeInfo });
};

const getEmployeeInfo = async (req, res) => {
  const employeeId = req.params.employeeId.slice(1);

  const employeeInformation = await EmployeeInfo.findById(employeeId);
  if (!employeeInformation) {
    throw new NotFoundError(`employeeInfo not found with ${employeeId}`);
  }

  res.status(StatusCodes.OK).json({ employeeInformation });
};

const deleteEmployeeInfo = async (req, res) => {
  const employeeId = req.params.employeeId.slice(1);
  const deletedEmployeeInfo = await EmployeeInfo.findByIdAndDelete(employeeId);
  if (!deletedEmployeeInfo) {
    throw new NotFoundError(`employeeInfo not found with ${employeeId}`);
  }
  res.status(StatusCodes.OK).json({ deletedEmployeeInfo });
};

module.exports = getEmployeesInfo = {
  getAllEmployeesInfo,
  createEmployeeInfo,
  getEmployeeInfo,
  deleteEmployeeInfo,
};
