const { StatusCodes } = require("http-status-codes");

const { BadRequestError, NotFoundError } = require("../errors");

const {
  EmployeePerformanceCriteria,
} = require("../models/EmployeePerFormanceCriteria");

const getEmployeesPerFormanceCriteria = async (req, res) => {
  const employeePerFormanceCriteria = await EmployeePerformanceCriteria.find();

  res.status(StatusCodes.OK).json({
    employeePerFormanceCriteria,
    length: employeePerFormanceCriteria.length,
  });
};

const createEmployeePerFormanceCriteria = async (req, res) => {
  const { type, name, criteria, total, is_group } = req.body;

  if (!type || !name) {
    throw new BadRequestError(
      "performance criteria type, name are required fields !"
    );
  }
  const newEmployeePerFormanceCriteria =
    await EmployeePerformanceCriteria.create({
      type,
      name,
      criteria,
      total,
      is_group,
    });
  res.status(StatusCodes.CREATED).json({ newEmployeePerFormanceCriteria });
};

const getEmployeePerFormanceCriteriaById = async (req, res) => {
  const performanceCriteriaId = req.params.performanceCriteriaId.slice(1);
  const employeePerFormanceCriteria =
    await EmployeePerformanceCriteria.findById(performanceCriteriaId);
  if (!employeePerFormanceCriteria) {
    throw new NotFoundError(
      `employee PerFormance Criteria not found with ${performanceCriteriaId}`
    );
  }
  res.status(StatusCodes.OK).json({ employeePerFormanceCriteria });
};

const deleteEmployeePerFormanceCriteriaById = async (req, res) => {
  const performanceCriteriaId = req.params.performanceCriteriaId.slice(1);
  const deletedEmployeePerFormanceCriteria =
    await EmployeePerformanceCriteria.findByIdAndDelete(performanceCriteriaId);
  if (!deletedEmployeePerFormanceCriteria) {
    throw new NotFoundError(
      `performance criteria not found with ${performanceCriteriaId}`
    );
  }
  res.status(StatusCodes.OK).json({ deletedEmployeePerFormanceCriteria });
};

const updateEmployeePerFormanceCriteriaById = async (req, res) => {
  const performanceCriteriaId = req.params.performanceCriteriaId.slice(1);
  const employeePerFormanceCriteria =
    await EmployeePerformanceCriteria.findById(performanceCriteriaId);
  if (!employeePerFormanceCriteria) {
    throw new NotFoundError(
      `employee PerFormance Criteria not found with ${performanceCriteriaId}`
    );
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }
  const updatedPerformanceCriteria = req.body;

  const updatedEmployeePerFormanceCriteria =
    await EmployeePerformanceCriteria.findByIdAndUpdate(
      performanceCriteriaId,
      updatedPerformanceCriteria,
      {
        new: true,
      }
    );
  res.status(StatusCodes.OK).json({ updatedEmployeePerFormanceCriteria });
};

module.exports = employeePerFormanceCriteria = {
  getEmployeesPerFormanceCriteria,
  createEmployeePerFormanceCriteria,
  getEmployeePerFormanceCriteriaById,
  deleteEmployeePerFormanceCriteriaById,
  updateEmployeePerFormanceCriteriaById,
};
