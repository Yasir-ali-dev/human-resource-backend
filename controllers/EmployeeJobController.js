const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { EmployeeJobs } = require("../models/EmployeeJobs");

const getAllEmployeeJobs = async (req, res) => {
  const allEmployeeJobs = await EmployeeJobs.find();
  res
    .status(StatusCodes.OK)
    .json({ allEmployeeJobs, length: allEmployeeJobs.length });
};

const createEmployeeJob = async (req, res) => {
  const { job, description } = req.body;
  if (!job) {
    throw new BadRequestError("job are required fields !");
  }
  const newEmployeeJobs = await EmployeeJobs.create({
    job,
    description,
  });
  res.status(StatusCodes.CREATED).json({ newEmployeeJobs });
};

const getEmployeeJob = async (req, res) => {
  const jobId = req.params.jobId.slice(1);
  const employeeJob = await EmployeeJobs.findById(jobId);
  if (!employeeJob) {
    throw new NotFoundError(`employee job not found with ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ employeeJob });
};

const deleteEmployeeJob = async (req, res) => {
  const jobId = req.params.jobId.slice(1);
  const deletedEmployeeJob = await EmployeeJobs.findByIdAndDelete(jobId);
  if (!deletedEmployeeJob) {
    throw new NotFoundError(`employee job not found with ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ deletedEmployeeJob });
};

const updateEmployeeJob = async (req, res) => {
  const jobId = req.params.jobId.slice(1);
  const employeeJob = await EmployeeJobs.findById(jobId);
  if (!employeeJob) {
    throw new NotFoundError(`employee job not found with ${jobId}`);
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }
  const updateEmployeeJobObj = req.body;

  const updatedEmployeeJob = await EmployeeJobs.findByIdAndUpdate(
    jobId,
    updateEmployeeJobObj,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedEmployeeJob });
};

module.exports = employeeJobs = {
  getAllEmployeeJobs,
  createEmployeeJob,
  deleteEmployeeJob,
  getEmployeeJob,
  updateEmployeeJob,
};
