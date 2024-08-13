const { default: mongoose } = require("mongoose");

const EmployeeInfoSchema = mongoose.Schema({
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
    enum: ["morning", "night"],
  },
  date_of_birth: {
    type: Date,
  },
  martial_status: {
    type: String,
    required: [true, "martial status is required"],
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
  address: {
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
});

module.exports = mongoose.model("EmployeeInfo", EmployeeInfoSchema);
