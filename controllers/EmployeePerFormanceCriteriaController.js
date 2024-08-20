const { StatusCodes } = require("http-status-codes");
const EmployeePerFormanceCriteria = require("../models/EmployeePerFormanceCriteria");

const { BadRequestError, NotFoundError } = require("../errors");

const getEmployeesPerFormanceCriteria = async (req, res) => {
  const employeePerFormanceCriteria = await EmployeePerFormanceCriteria.find();
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
    await EmployeePerFormanceCriteria.create({
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
    await EmployeePerFormanceCriteria.findById(performanceCriteriaId);
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
    await EmployeePerFormanceCriteria.findByIdAndDelete(performanceCriteriaId);
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
    await EmployeePerFormanceCriteria.findById(performanceCriteriaId);
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
    await EmployeePerFormanceCriteria.findByIdAndUpdate(
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
