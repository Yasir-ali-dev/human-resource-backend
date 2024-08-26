const { StatusCodes } = require("http-status-codes");
const EmployeeInfo = require("../models/EmployeeInfo");
const { BadRequestError, NotFoundError } = require("../errors");
const { EmployeeType } = require("../models/EmployeeType");
const { WorkCalender } = require("../models/WorkCalender");
const { EmployeeJobs } = require("../models/EmployeeJobs");
const { EmployeeDesignation } = require("../models/EmployeeDesignation");
const { EmployeeGrade } = require("../models/EmployeeGrade");
const { default: mongoose } = require("mongoose");

const getAllEmployeesInfo = async (req, res) => {
  const allEmployeesInfo = await EmployeeInfo.find({});
  res
    .status(StatusCodes.OK)
    .json({ allEmployeesInfo, length: allEmployeesInfo.length });
};

const createEmployeeInfo = async (req, res) => {
  try {
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
      designation,
      department_name,
      //
      employeeType,
      employeeGrade,
      workCalander,
      employeeJob,
    } = req.body;
    if (
      !hired_date ||
      !username ||
      !email ||
      !name ||
      !employeeType ||
      !employeeGrade ||
      !workCalander
    ) {
      console.log(
        department_name,
        email,
        hired_date,
        employeeType,
        employeeGrade,
        workCalander
      );
      throw new BadRequestError(
        "employeeType, employeeGrade, workCalender, hired_date, username, email, name are required fields !"
      );
    }

    const newEmployeeInfo = EmployeeInfo({
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
      designation,
      supervisor,
      department_name,
    });
    // employee type
    const [employeeTypeExist] = await EmployeeType.find({
      employeeType: employeeType,
    });

    if (!employeeTypeExist) {
      throw new NotFoundError(`${employeeType} employeeType not found`);
    }
    newEmployeeInfo.employeeType = employeeTypeExist;

    // employee grade
    const [employeeGradeExist] = await EmployeeGrade.find({
      employee_grade: employeeGrade,
    });
    if (!employeeGradeExist) {
      throw new NotFoundError(`${employeeGrade} employee grade not found`);
    }
    newEmployeeInfo.employeeGrade = employeeGradeExist;

    // work calander
    const [workCalenderExist] = await WorkCalender.find({
      work_calender: workCalander,
    });
    if (!workCalenderExist) {
      throw new NotFoundError(`${workCalender} work calender not found`);
    }
    newEmployeeInfo.workCalender = workCalenderExist;

    // employee job
    const [employeeJobExist] = await EmployeeJobs.find({ job: employeeJob });
    if (!employeeJobExist) {
      throw new NotFoundError(`${employeeJob} employee job not found`);
    }
    newEmployeeInfo.employeeJob = employeeJobExist;

    const [employeeDesignationExist] = await EmployeeDesignation.find({
      designation: designation,
    });
    if (!employeeDesignationExist) {
      throw new NotFoundError(`${designation} employee designation not found`);
    }
    newEmployeeInfo.employeeDesignation = employeeDesignationExist;

    await newEmployeeInfo.save();
    res.status(StatusCodes.CREATED).json({ newEmployeeInfo });
  } catch (error) {
    console.log(error);
  }
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
  const {
    employeeDesignation,
    department_name,
    employeeType,
    employeeGrade,
    workCalender,
    employeeJob,
    ...updateEmployeeObj
  } = req.body;

  // employee type
  if (employeeType && department_name) {
    const [employeeTypeExist] = await EmployeeType.find({
      employeeType: employeeType,
      department_name: department_name,
    });
    if (!employeeTypeExist) {
      throw new NotFoundError(`${employeeType} employeeType not found`);
    }
    newEmployeeInfo.employeeType = employeeTypeExist;
  }

  if (employeeGrade) {
    // employee grade
    const [employeeGradeExist] = await EmployeeGrade.find({
      employee_grade: employeeGrade,
    });
    if (!employeeGradeExist) {
      throw new NotFoundError(`${employeeGrade} employee grade not found`);
    }
    newEmployeeInfo.employeeGrade = employeeGradeExist;
  }

  if (workCalender) {
    // work calander
    const [workCalenderExist] = await WorkCalender.find({
      work_calender: workCalender,
    });
    if (!workCalenderExist) {
      throw new NotFoundError(`${workCalender} work calender not found`);
    }
    newEmployeeInfo.workCalender = workCalenderExist;
  }
  if (employeeJob) {
    // employee job
    const [employeeJobExist] = await EmployeeJobs.find({ job: employeeJob });
    if (!employeeJobExist) {
      throw new NotFoundError(`${employeeJob} employee job not found`);
    }
    newEmployeeInfo.employeeJob = employeeJobExist;
  }
  if (employeeDesignation) {
    const [employeeDesignationExist] = await EmployeeDesignation.find({
      designation: employeeDesignation,
    });
    if (!employeeDesignationExist) {
      throw new NotFoundError(
        `${employeeDesignation} employee designation not found`
      );
    }
    newEmployeeInfo.employeeDesignation = employeeDesignationExist;
  }

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
  getEmployeeByUsername,
};
