const { StatusCodes } = require("http-status-codes");
const EmployeeInfo = require("../../models/EmployeeModels/EmployeeInfo");
const { BadRequestError, NotFoundError } = require("../../errors");
const { EmployeeType } = require("../../models/EmployeeModels/EmployeeType");
const { WorkCalender } = require("../../models/EmployeeModels/WorkCalender");
const { EmployeeJobs } = require("../../models/EmployeeModels/EmployeeJobs");
const {
  EmployeeDesignation,
} = require("../../models/EmployeeModels/EmployeeDesignation");
const { EmployeeGrade } = require("../../models/EmployeeModels/EmployeeGrade");
const { default: mongoose } = require("mongoose");

const getAllEmployeesInfo = async (req, res) => {
  const allEmployeesInfo = await EmployeeInfo.find({});
  res
    .status(StatusCodes.OK)
    .json({ allEmployeesInfo, length: allEmployeesInfo.length });
};
// **
// const createEmployeeInfo = async (req, res) => {
//   try {
//     const {
//       employee_id,
//       username,
//       email,
//       name,
//       role,
//       status,
//       report_to,
//       shift,
//       date_of_birth,
//       state,
//       city,
//       zip_code,
//       work_phone,
//       nationality,
//       gender,
//       current_address,
//       permanent_address,
//       country,
//       mobile,
//       home_phone,
//       hired_date,
//       religion,
//       guardian,
//       location_name,
//       payroll,
//       working_status,
//       is_sales_representative,
//       is_delivery_man,
//       supervisor,
//       martial_status,
//       designation,
//       department_name,
//       //
//       employeeType,
//       employeeGrade,
//       workCalander,
//       employeeJob,
//     } = req.body;
//     if (
//       !hired_date ||
//       !username ||
//       !email ||
//       !name ||
//       !employeeType ||
//       !employeeGrade ||
//       !workCalander
//     ) {
//       throw new BadRequestError(
//         "employeeType, employeeGrade, workCalender, hired_date, username, email, name are required fields !"
//       );
//     }
//     const isExists = await EmployeeInfo.findOne({ username });
//     if (isExists) {
//       throw new BadRequestError("username already exists");
//     }

//     const newEmployeeInfo = EmployeeInfo({
//       employee_id,
//       username,
//       email,
//       name,
//       role,
//       status,
//       report_to,
//       shift,
//       date_of_birth,
//       martial_status,
//       state,
//       city,
//       zip_code,
//       work_phone,
//       nationality,
//       gender,
//       current_address,
//       permanent_address,
//       country,
//       mobile,
//       home_phone,
//       hired_date,
//       religion,
//       guardian,
//       location_name,
//       payroll,
//       working_status,
//       is_sales_representative,
//       is_delivery_man,
//       designation,
//       supervisor,
//       department_name,
//     });
//     // employee type
//     const employeeTypeExist = await EmployeeType.findOne({
//       employeeType: employeeType,
//     });
//     if (!employeeTypeExist) {
//       throw new NotFoundError(`${employeeType} employeeType not found`);
//     }
//     newEmployeeInfo.employeeType = employeeTypeExist;

//     // employee grade
//     const employeeGradeExist = await EmployeeGrade.findOne({
//       employee_grade: employeeGrade,
//     });
//     if (!employeeGradeExist) {
//       throw new NotFoundError(`${employeeGrade} employee grade not found`);
//     }
//     newEmployeeInfo.employeeGrade = employeeGradeExist;

//     // work calander
//     const workCalenderExist = await WorkCalender.findOne({
//       work_calender: workCalander,
//     });
//     if (!workCalenderExist) {
//       throw new NotFoundError(`${workCalender} work calender not found`);
//     }
//     newEmployeeInfo.workCalender = workCalenderExist;

//     // employee job
//     const employeeJobExist = await EmployeeJobs.findOne({ job: employeeJob });
//     if (!employeeJobExist) {
//       throw new NotFoundError(`${employeeJob} employee job not found`);
//     }
//     newEmployeeInfo.employeeJob = employeeJobExist;

//     const employeeDesignationExist = await EmployeeDesignation.findOne({
//       designation: designation,
//     });
//     if (!employeeDesignationExist) {
//       throw new NotFoundError(`${designation} employee designation not found`);
//     }
//     newEmployeeInfo.employeeDesignation = employeeDesignationExist;

//     await newEmployeeInfo.save();
//     res.status(StatusCodes.CREATED).json({ newEmployeeInfo });
//   } catch (error) {
//     throw new BadRequestError(error.message);
//   }
// };

const createEmployeeInfo = async (req, res) => {
  try {
    const {
      username,
      email,
      name,
      role,
      report_to,
      shift,
      birth_date,
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
      employeeType,
      employeeGrade,
      workCalander,
      cnic,
      employeeJob,
    } = req.body;

    // Validation for required fields
    if (
      !hired_date ||
      !username ||
      !email ||
      !name ||
      !employeeType ||
      !employeeGrade ||
      !workCalander
    ) {
      console.log(department_name, employeeType, employeeGrade, workCalander);

      throw new BadRequestError(
        "Required fields: employeeType, employeeGrade, workCalender, hired_date, username, email, name"
      );
    }

    // Check for existing employee
    const isExists = await EmployeeInfo.findOne({ username });
    if (isExists) {
      throw new BadRequestError("Username already exists");
    }

    // Create new employee info object
    const newEmployeeInfo = new EmployeeInfo({
      username,
      email,
      name,
      cnic,
      role,
      report_to,
      shift,
      birth_date,
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

    // Setting related fields
    newEmployeeInfo.employeeType = await findAndValidate(
      EmployeeType,
      { employeeType },
      `${employeeType} employee type not found`
    );

    newEmployeeInfo.employeeGrade = await findAndValidate(
      EmployeeGrade,
      { employee_grade: employeeGrade },
      `${employeeGrade} employee grade not found`
    );

    newEmployeeInfo.workCalander = await findAndValidate(
      WorkCalender,
      { work_calender: workCalander },
      `${workCalender} work calender not found`
    );

    newEmployeeInfo.employeeJob = await findAndValidate(
      EmployeeJobs,
      { job: employeeJob },
      `${employeeJob} employee job not found`
    );

    newEmployeeInfo.employeeDesignation = await findAndValidate(
      EmployeeDesignation,
      { designation },
      `${designation} employee designation not found`
    );

    // Save the new employee info
    await newEmployeeInfo.save();
    res.status(StatusCodes.CREATED).json({ newEmployeeInfo });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

// Helper function to find and validate related fields
const findAndValidate = async (Model, query, errorMessage) => {
  const result = await Model.findOne(query);
  if (!result) {
    throw new NotFoundError(errorMessage);
  }
  return result;
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
  try {
    const employeeId = req.params.employeeId.slice(1);
    const deletedEmployeeInfo = await EmployeeInfo.findByIdAndDelete(
      employeeId
    );
    if (!deletedEmployeeInfo) {
      throw new NotFoundError(`employeeInfo not found with ${employeeId}`);
    }
    return res.status(StatusCodes.OK).json({ deletedEmployeeInfo });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
// // //**
// // const updateEmployeeInfo = async (req, res) => {
// //   try {
// //     const employeeId = req.params.employeeId.slice(1);
// //     const employeeInformation = await EmployeeInfo.findById(employeeId);
// //     if (!employeeInformation) {
// //       throw new NotFoundError(`employeeInfo not found with ${employeeId}`);
// //     }
// //     if (Object.keys(req.body).length === 0) {
// //       throw new BadRequestError("Can not update with empty Object");
// //     }

// //     const {
// //       username,
// //       email,
// //       name,
// //       role,
// //       report_to,
// //       shift,
// //       date_of_birth,
// //       state,
// //       city,
// //       zip_code,
// //       work_phone,
// //       nationality,
// //       gender,
// //       current_address,
// //       permanent_address,
// //       country,
// //       mobile,
// //       home_phone,
// //       hired_date,
// //       religion,
// //       guardian,
// //       location_name,
// //       payroll,
// //       working_status,
// //       is_sales_representative,
// //       is_delivery_man,
// //       supervisor,
// //       martial_status,
// //       designation,
// //       department_name,
// //       employeeType,
// //       employeeGrade,
// //       workCalander,
// //       employeeJob,
// //     } = req.body;

// //     const newEmployeeInfo = EmployeeInfo({
// //       employee_id,
// //       username,
// //       email,
// //       name,
// //       role,
// //       status,
// //       report_to,
// //       shift,
// //       date_of_birth,
// //       state,
// //       city,
// //       zip_code,
// //       work_phone,
// //       nationality,
// //       gender,
// //       current_address,
// //       permanent_address,
// //       country,
// //       mobile,
// //       home_phone,
// //       hired_date,
// //       religion,
// //       guardian,
// //       location_name,
// //       payroll,
// //       working_status,
// //       is_sales_representative,
// //       is_delivery_man,
// //       supervisor,
// //       martial_status,
// //     });

// //     // employee type
// //     if (employeeType && department_name) {
// //       const employeeTypeExist = await EmployeeType.findOne({
// //         employeeType: employeeType,
// //         department_name: department_name,
// //       });
// //       if (!employeeTypeExist) {
// //         throw new NotFoundError(`${employeeType} employeeType not found`);
// //       }
// //       newEmployeeInfo.employeeType = employeeTypeExist;
// //     }

// //     if (employeeGrade) {
// //       // employee grade
// //       const employeeGradeExist = await EmployeeGrade.findOne({
// //         employee_grade: employeeGrade,
// //       });
// //       if (!employeeGradeExist) {
// //         throw new NotFoundError(`${employeeGrade} employee grade not found`);
// //       }
// //       newEmployeeInfo.employeeGrade = employeeGradeExist;
// //     }

// //     if (workCalender) {
// //       // work calander
// //       const workCalenderExist = await WorkCalender.findOne({
// //         work_calender: workCalender,
// //       });
// //       if (!workCalenderExist) {
// //         throw new NotFoundError(`${workCalender} work calender not found`);
// //       }
// //       newEmployeeInfo.workCalender = workCalenderExist;
// //     }
// //     if (employeeJob) {
// //       // employee job
// //       const employeeJobExist = await EmployeeJobs.findOne({ job: employeeJob });
// //       if (!employeeJobExist) {
// //         throw new NotFoundError(`${employeeJob} employee job not found`);
// //       }
// //       newEmployeeInfo.employeeJob = employeeJobExist;
// //     }
// //     if (designation) {
// //       const employeeDesignationExist = await EmployeeDesignation.find({
// //         designation: employeeDesignation,
// //       });
// //       if (!employeeDesignationExist) {
// //         throw new NotFoundError(
// //           `${employeeDesignation} employee designation not found`
// //         );
// //       }
// //       newEmployeeInfo.employeeDesignation = employeeDesignationExist;
// //     }

// //     const updatedEmployeeInfo = await EmployeeInfo.findByIdAndUpdate(
// //       employeeId,
// //       updateEmployeeObj,
// //       {
// //         new: true,
// //       }
// //     );
// //     res.status(StatusCodes.OK).json({ updatedEmployeeInfo });
// //   } catch (error) {
// //     throw new BadRequestError(error.message);
// //   }
// };

const updateEmployeeInfo = async (req, res) => {
  try {
    const employeeId = req.params.employeeId.slice(1);
    // Fetch the existing employee info
    const employeeInformation = await EmployeeInfo.findById(employeeId);
    if (!employeeInformation) {
      throw new NotFoundError(`Employee not found with ID ${employeeId}`);
    }

    if (Object.keys(req.body).length === 0) {
      throw new BadRequestError("Cannot update with empty object");
    }

    const {
      department_name,
      employeeType,
      employeeGrade,
      workCalander,
      employeeJob,
      designation,
      username,
      email,
      name,
      role,
      report_to,
      shift,
      birth_date,
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
      cnic,
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

    const updateFields = {
      department_name,
      username,
      email,
      name,
      role,
      report_to,
      shift,
      birth_date,
      state,
      city,
      zip_code: zip_code,
      work_phone,
      cnic,
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
    };

    if (
      employeeType &&
      employeeType !== employeeInformation.employeeType?.employeeType
    ) {
      updateFields.employeeType = await findAndValidate(
        EmployeeType,
        { employeeType },
        `${employeeType} employee type not found`
      );
    }

    if (
      employeeGrade &&
      employeeGrade !== employeeInformation.employeeGrade?.employee_grade
    ) {
      updateFields.employeeGrade = await findAndValidate(
        EmployeeGrade,
        { employee_grade: employeeGrade },
        `${employeeGrade} employee grade not found`
      );
    }

    if (
      workCalander &&
      workCalander !== employeeInformation.workCalander?.work_calander
    ) {
      updateFields.workCalender = await findAndValidate(
        WorkCalender,
        { work_calender: workCalander },
        `${workCalander} work calender not found`
      );
    }

    if (employeeJob && employeeJob !== employeeInformation.employeeJob?.job) {
      updateFields.employeeJob = await findAndValidate(
        EmployeeJobs,
        { job: employeeJob },
        `${employeeJob} employee job not found`
      );
    }

    if (
      designation &&
      designation !== employeeInformation.employeeDesignation?.designation
    ) {
      updateFields.employeeDesignation = await findAndValidate(
        EmployeeDesignation,
        { designation },
        `${designation} employee designation not found`
      );
    }

    const updatedEmployeeInfo = await EmployeeInfo.findByIdAndUpdate(
      employeeId,
      updateFields,
      { new: true }
    );

    res.status(StatusCodes.OK).json({ updatedEmployeeInfo });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

module.exports = getEmployeesInfo = {
  getAllEmployeesInfo,
  createEmployeeInfo,
  getEmployeeInfo,
  deleteEmployeeInfo,
  updateEmployeeInfo,
  getEmployeeByUsername,
};
