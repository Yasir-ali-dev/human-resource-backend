const { default: mongoose } = require("mongoose");
const { employeeTypeSchema } = require("./EmployeeType");
const { employeeGradeSchema } = require("./EmployeeGrade");
const { workCalenderSchema } = require("./WorkCalender");
const { employeeJobsSchema } = require("./EmployeeJobs");
const { employeeDesignationSchema } = require("./EmployeeDesignation");
const { v4: uuidv4 } = require("uuid");

const EmployeeInfoSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    default: uuidv4(),
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username is already taken !"],
  },
  department_name: {
    type: String,
    required: [true, "department_name is required"],
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  role: {
    type: String,
  },

  report_to: {
    type: String,
  },
  shift: {
    type: String,
    default: "morning",
    enum: ["morning", "night", "evening"],
  },
  date_of_birth: {
    type: Date,
  },
  martial_status: {
    type: String,
    enum: ["single", "married"],
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  work_phone: {
    type: String,
  },
  nationality: {
    type: String,
  },
  gender: {
    type: String,
    lowercase: true,
    enum: ["male", "female", "others"],
  },
  current_address: {
    type: String,
  },
  permanent_address: {
    type: String,
  },
  country: {
    type: String,
  },
  mobile: {
    type: String,
  },
  home_phone: {
    type: String,
  },
  hired_date: {
    type: Date,
    required: [true, "hired date is required"],
  },
  religion: {
    type: String,
  },
  guardian: {
    type: String,
  },

  location_name: {
    type: String,
  },
  payroll: {
    type: String,
    required: [true, "payroll is required"],
  },

  working_status: {
    type: String,
    default: "active",
  },
  is_sales_representative: {
    type: Boolean,
  },
  is_delivery_man: {
    type: Boolean,
  },
  supervisor: {
    type: String,
  },
  employeeType: employeeTypeSchema,
  employeeGrade: employeeGradeSchema,
  workCalender: workCalenderSchema,
  employeeJob: employeeJobsSchema,
  employeeDesignation: employeeDesignationSchema,
  employeePayElement: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeePayElement",
    },
  ],
  employeeSalary: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeSalary",
    },
  ],
  employeePerformanceEvaluation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeePerformanceEvaluation",
    },
  ],
});

EmployeeInfoSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await mongoose
      .model("EmployeePerformanceEvaluation")
      .deleteMany({ employeeInfo: doc._id });

    await mongoose.model("EmployeeSalary").deleteMany({
      employeeInfo: doc._id,
    });

    await mongoose.model("EmployeePayElement").deleteMany({
      employeeInfo: doc._id,
    });

    console.log("employee performance, employee salary also deleted");
  }
});

module.exports = mongoose.model("EmployeeInfo", EmployeeInfoSchema);
