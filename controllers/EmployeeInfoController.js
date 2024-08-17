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
    employee_id,
    username,
    email,
    name,
    role,
    status,
    report_to,
    shift,
    date_of_birth,
    state,
    city,
    zip_code,
    work_phone,
    personal_email,
    nationality,
    gender,
    current_address,
    permanent_address,
    country,
    mobile,
    home_phone,
    hired_date,
    religion,
    guardian,
    location_name,
    payroll,
    working_status,
    is_sales_representative,
    is_delivery_man,
    supervisor,
    martial_status,
  } = req.body;
  if (
    !hired_date ||
    !employee_id ||
    !username ||
    !email ||
    !name ||
    !role ||
    !status ||
    !report_to
  ) {
    throw new BadRequestError(
      "employee_id, hired_date, username, email, name, role,status, report_to, shift, martial_status and gender are required fields !"
    );
  }
  const newEmployeeInfo = await EmployeeInfo.create({
    employee_id,
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
    current_address,
    permanent_address,
    country,
    mobile,
    home_phone,
    hired_date,
    religion,
    guardian,
    location_name,
    payroll,
    working_status,
    is_sales_representative,
    is_delivery_man,
    supervisor,
  });
  res.status(StatusCodes.CREATED).json({ newEmployeeInfo });
};

const getEmployeeByEmployeeId = async (req, res) => {
  const employeeId = req.params.employeeId.slice(1);
  const employeeInformation = await EmployeeInfo.findOne({
    employee_id: employeeId,
  });
  if (!employeeInformation) {
    throw new NotFoundError(
      `employeeInfo not found with employee id ${employeeId}`
    );
  }

  res.status(StatusCodes.OK).json({ employeeInformation });
};

const getEmployeeByUsername = async (req, res) => {
  const username = req.params.username.slice(1);
  const employeeInformation = await EmployeeInfo.findOne({
    username: username,
  });
  if (!employeeInformation) {
    throw new NotFoundError(`employeeInfo not found with username ${username}`);
  }

  res.status(StatusCodes.OK).json({ employeeInformation });
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

const updateEmployeeInfo = async (req, res) => {
  const employeeId = req.params.employeeId.slice(1);
  const employeeInformation = await EmployeeInfo.findById(employeeId);
  if (!employeeInformation) {
    throw new NotFoundError(`employeeInfo not found with ${employeeId}`);
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }
  const updateEmployeeObj = req.body;

  const updatedEmployeeInfo = await EmployeeInfo.findByIdAndUpdate(
    employeeId,
    updateEmployeeObj,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedEmployeeInfo });
};

module.exports = getEmployeesInfo = {
  getAllEmployeesInfo,
  createEmployeeInfo,
  getEmployeeInfo,
  deleteEmployeeInfo,
  updateEmployeeInfo,
  getEmployeeByEmployeeId,
  getEmployeeByUsername,
};
