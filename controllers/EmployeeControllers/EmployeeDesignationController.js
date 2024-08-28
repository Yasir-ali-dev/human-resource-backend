const { StatusCodes } = require("http-status-codes");
const {
  EmployeeDesignation,
} = require("../../models/EmployeeModels/EmployeeDesignation");
const { BadRequestError, NotFoundError } = require("../../errors/index");

const getAllEmployeeDesignations = async (req, res) => {
  const allEmployeeDesignations = await EmployeeDesignation.find();
  res
    .status(StatusCodes.OK)
    .json({ allEmployeeDesignations, length: allEmployeeDesignations.length });
};

const createEmployeeDesignation = async (req, res) => {
  const { designation } = req.body;
  if (!designation) {
    throw new BadRequestError("designation are required fields !");
  }
  const newEmployeeDesignation = await EmployeeDesignation.create({
    designation,
  });
  res.status(StatusCodes.CREATED).json({ newEmployeeDesignation });
};

const getEmployeeDesignation = async (req, res) => {
  const designationId = req.params.designationId.slice(1);
  const employeeDesignation = await EmployeeDesignation.findById(designationId);
  if (!employeeDesignation) {
    throw new NotFoundError(
      `employee designation not found with ${designationId}`
    );
  }
  res.status(StatusCodes.OK).json({ employeeDesignation });
};

const deleteEmployeeDesignation = async (req, res) => {
  const designationId = req.params.designationId.slice(1);

  const deletedEmployeeDesignation =
    await EmployeeDesignation.findByIdAndDelete(designationId);
  if (deletedEmployeeDesignation) {
    return res.status(StatusCodes.OK).json({ deletedEmployeeDesignation });
  }
  throw new NotFoundError(
    `employee designation not found with ${designationId}`
  );
};

const updateEmployeeDesignation = async (req, res) => {
  const designationId = req.params.designationId.slice(1);
  const employeeDesignation = await EmployeeDesignation.findById(designationId);
  if (!employeeDesignation) {
    throw new NotFoundError(
      `employee designation not found with ${designationId}`
    );
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }
  const updateEmployeeDesignationObj = req.body;

  const updatedEmployeeDesignation =
    await EmployeeDesignation.findByIdAndUpdate(
      designationId,
      updateEmployeeDesignationObj,
      {
        new: true,
      }
    );
  res.status(StatusCodes.OK).json({ updatedEmployeeDesignation });
};

module.exports = employeeDesignation = {
  getAllEmployeeDesignations,
  createEmployeeDesignation,
  getEmployeeDesignation,
  deleteEmployeeDesignation,
  updateEmployeeDesignation,
};
