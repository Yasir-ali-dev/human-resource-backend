const { default: mongoose } = require("mongoose");

const EmployeeInfoSchema = mongoose.Schema({
  employee_id: {
    type: String,
    required: [true, "employee_id is required"],
    unique: [true, "employee_id must be unique"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username is already taken !"],
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
    required: [true, "role is required"],
  },
  status: {
    type: String,
    required: [true, "status is required"],
  },
  report_to: {
    type: String,
    required: [true, "report to is required"],
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
    required: [true, "phone is required"],
  },
  personal_email: {
    type: String,
    unique: [true, "email must be unique"],
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  nationality: {
    type: String,
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
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

  // table
  // work_calander: {
  //   type: String,
  //   default: "Monday to Friday",
  // },

  payroll: {
    type: String,
  },

  // table
  // employee_grade
  // department_name: {
  //   type: String,
  // },

  working_status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
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
});

module.exports = mongoose.model("EmployeeInfo", EmployeeInfoSchema);
