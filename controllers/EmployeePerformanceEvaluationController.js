const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const EmployeePerformanceEvaluation = require("../models/EmployeePerformanceEvaluation");
const EmployeeInfo = require("../models/EmployeeInfo");

const getAllEmployeePerformanceEvaluations = async (req, res) => {
  const allEmployeePerformanceEvaluations =
    await EmployeePerformanceEvaluation.find();
  res.status(StatusCodes.OK).json({
    allEmployeePerformanceEvaluations,
    length: allEmployeePerformanceEvaluations.length,
  });
};

const createEmployeePerformanceEvaluation = async (req, res) => {
  const {
    transactionDate,
    employee_username,
    supervisor,
    obtainScore,
    percentage,
    totalScore,
  } = req.body;
  const newEmployeePerformanceEvaluation = EmployeePerformanceEvaluation({
    transactionDate,
    supervisor,
    obtainScore,
    percentage,
    totalScore,
  });
  const [employeeInfo] = await EmployeeInfo.find({
    username: employee_username,
  });
  if (!employeeInfo) {
    throw new NotFoundError(
      `employee info not found with username "${employee_username}"`
    );
  }
  employeeInfo.employeePerformanceEvaluation.push(
    newEmployeePerformanceEvaluation
  );
  await employeeInfo.save();
  newEmployeePerformanceEvaluation.employeeInfo = employeeInfo._id;
  await newEmployeePerformanceEvaluation.save();
  res.status(StatusCodes.CREATED).json({ newEmployeePerformanceEvaluation });
};

const getEmployeePerformanceEvaluation = async (req, res) => {
  const evaluationId = req.params.evaluationId.slice(1);
  const employeePerformanceEvaluation =
    await EmployeePerformanceEvaluation.findById(evaluationId);
  if (!employeePerformanceEvaluation) {
    throw new NotFoundError(
      `employee evaluation not found with ${evaluationId}`
    );
  }
  res.status(StatusCodes.OK).json({ employeePerformanceEvaluation });
};

const deleteEmployeePerformanceEvaluation = async (req, res) => {
  const evaluationId = req.params.evaluationId.slice(1);
  const deletedEmployeePerformanceEvaluation =
    await EmployeePerformanceEvaluation.findByIdAndDelete(evaluationId);
  if (!deletedEmployeePerformanceEvaluation) {
    throw new NotFoundError(
      `employee performance evaluation not found with ${evaluationId}`
    );
  }
  res.status(StatusCodes.OK).json({ deletedEmployeePerformanceEvaluation });
};

const updateEmployeePerformanceEvaluation = async (req, res) => {
  const evaluationId = req.params.evaluationId.slice(1);
  const employeePerformanceEvaluation =
    await EmployeePerformanceEvaluation.findById(evaluationId);
  if (!employeePerformanceEvaluation) {
    throw new NotFoundError(
      `employee evaluation not found with ${evaluationId}`
    );
  }
  const { supervisor, obtainScore, percentage, totalScore } = req.body;
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }
  const updateEmployeeEvaluationObj = req.body;

  const updatedEmployeePerformanceEvaluation =
    await EmployeePerformanceEvaluation.findByIdAndUpdate(
      evaluationId,
      { supervisor, obtainScore, percentage, totalScore },
      {
        new: true,
      }
    );
  res.status(StatusCodes.OK).json({ updatedEmployeePerformanceEvaluation });
};

module.exports = employeePerformanceEvaluation = {
  getAllEmployeePerformanceEvaluations,
  createEmployeePerformanceEvaluation,
  getEmployeePerformanceEvaluation,
  deleteEmployeePerformanceEvaluation,
  updateEmployeePerformanceEvaluation,
};
