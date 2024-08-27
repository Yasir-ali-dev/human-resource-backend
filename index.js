require("express-async-errors");
require("dotenv").config();
const express = require("express");
const dbConfig = require("./db/dbConfig");
const bodyParser = require("body-parser");
const cors = require("cors");
// middlewares
const errorHandlerMiddleware = require("./middlewares/GlobalErrorHandler");
const notFoundError = require("./middlewares/NotFound");
// routers
const employeeTypeRouter = require("./routes/EmployeeTypeRoute");
const employeeInfoRouter = require("./routes/EmployeeInfoRoutes");
const employeeGradeRouter = require("./routes/EmployeeGradeRoutes");
const workCalenderRouter = require("./routes/WorkCalenderRoutes");
const employeePayElementRouter = require("./routes/EmployeePayElementRoutes");
const employeePerFormanceCriteriaRouter = require("./routes/EmployeePerFormanceCriteriaRoutes");
const employeeDesignationRouter = require("./routes/EmployeeDesignationRoutes");
const employeeSalaryRouter = require("./routes/EmployeeSalaryRoutes");
const employeeJobRouter = require("./routes/EmployeeJobRoutes");
const employeeEvaluationRouter = require("./routes/EmployeePerformanceEvaluationRoutes");
const EmployeeInfo = require("./models/EmployeeInfo");
const { default: mongoose } = require("mongoose");

const app = express();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3001" }));

// endpoints
app.use("/api/v1/employeesInfo", employeeInfoRouter);
app.use("/api/v1/employeeTypes", employeeTypeRouter);
app.use("/api/v1/employeeGrades", employeeGradeRouter);
app.use("/api/v1/workCalenders", workCalenderRouter);
app.use("/api/v1/employeePayElements", employeePayElementRouter);
app.use("/api/v1/employeeDesignations", employeeDesignationRouter);
app.use("/api/v1/ ", employeeSalaryRouter);
app.use("/api/v1/employeeJobs", employeeJobRouter);
app.use(
  "/api/v1/employeePerFormanceCriteria",
  employeePerFormanceCriteriaRouter
);
app.use("/api/v1/employeePerFormanceEvaluations", employeeEvaluationRouter);
//

// error handlers middlewares
app.use(errorHandlerMiddleware);
app.use("*", notFoundError);

// connection
const port = process.env.PORT;
const start = async () => {
  try {
    await dbConfig(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening to the port ${port} ...`);
    });
  } catch (error) {
    console.log(`mongoose connection error ${Object.values(error)}`);
  }
};
start();
