require("express-async-errors");
require("dotenv").config();
const express = require("express");
const dbConfig = require("./db/dbConfig");
const errorHandlerMiddleware = require("./middlewares/GlobalErrorHandler");
const notFoundError = require("./middlewares/NotFound");
const employeeInfo = require("./routes/EmployeeInfoRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use("/api/v1/employeesInfo", employeeInfo);
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
