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
const employeeTypeRouter = require("./routes/EmployeeRoutes/EmployeeTypeRoute");
const employeeInfoRouter = require("./routes/EmployeeRoutes/EmployeeInfoRoutes");
const employeeGradeRouter = require("./routes/EmployeeRoutes/EmployeeGradeRoutes");
const workCalenderRouter = require("./routes/EmployeeRoutes/WorkCalenderRoutes");
const employeePayElementRouter = require("./routes/EmployeeRoutes/EmployeePayElementRoutes");
const employeePerFormanceCriteriaRouter = require("./routes/EmployeeRoutes/EmployeePerFormanceCriteriaRoutes");
const employeeDesignationRouter = require("./routes/EmployeeRoutes/EmployeeDesignationRoutes");
const employeeSalaryRouter = require("./routes/EmployeeRoutes/EmployeeSalaryRoutes");
const employeeJobRouter = require("./routes/EmployeeRoutes/EmployeeJobRoutes");
const employeeEvaluationRouter = require("./routes/EmployeeRoutes/EmployeePerformanceEvaluationRoutes");
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
app.use("/api/v1/employeeSalaries", employeeSalaryRouter);
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
