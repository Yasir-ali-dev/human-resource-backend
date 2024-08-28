const { StatusCodes } = require("http-status-codes");
const { WorkCalender } = require("../../models/EmployeeModels/WorkCalender");

const { BadRequestError, NotFoundError } = require("../../errors");

const getWorkCalender = async (req, res) => {
  const workCalender = await WorkCalender.find();
  res
    .status(StatusCodes.OK)
    .json({ workCalender, length: workCalender.length });
};

const createWorkCalenderInstance = async (req, res) => {
  const { work_calender, work_hours_per_day, days_per_week } = req.body;
  if (!work_calender) {
    throw new BadRequestError("work_calender is required fields !");
  }
  const newWorkCalender = await WorkCalender.create({
    work_calender,
    work_hours_per_day,
    days_per_week,
  });
  res.status(StatusCodes.CREATED).json({ newWorkCalender });
};

const getWorkCalenderInstance = async (req, res) => {
  const workCalenderId = req.params.workCalenderId.slice(1);
  const workCalender = await WorkCalender.findById(workCalenderId);
  if (!workCalender) {
    throw new NotFoundError(`work calender not found with ${workCalenderId}`);
  }
  res.status(StatusCodes.OK).json({ workCalender });
};

const deleteWorkCalenderInstance = async (req, res) => {
  const workCalenderId = req.params.workCalenderId.slice(1);
  const deletedWorkCalender = await WorkCalender.findByIdAndDelete(
    workCalenderId
  );
  if (!deletedWorkCalender) {
    throw new NotFoundError(`work calender not found with ${workCalenderId}`);
  }
  res.status(StatusCodes.OK).json({ deletedWorkCalender });
};

const updateWorkCalenderIntance = async (req, res) => {
  const workCalenderId = req.params.workCalenderId.slice(1);
  const workCalender = await WorkCalender.findById(workCalenderId);
  if (!workCalender) {
    throw new NotFoundError(`work calender not found with ${workCalenderId}`);
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Can not update with empty Object");
  }
  const updatedWorkCalenderRequest = req.body;

  const updatedWorkCalender = await WorkCalender.findByIdAndUpdate(
    workCalenderId,
    updatedWorkCalenderRequest,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedWorkCalender });
};

module.exports = workCalender = {
  getWorkCalender,
  createWorkCalenderInstance,
  getWorkCalenderInstance,
  deleteWorkCalenderInstance,
  updateWorkCalenderIntance,
};
