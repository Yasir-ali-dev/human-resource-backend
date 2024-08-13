const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Internal Server Error",
  };

  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `${Object.values(err.errors).map(
      (val) => val.message
    )}`;
  }
  if (err.code && err.code === 11000) {
    (customError.statusCode = StatusCodes.BAD_REQUEST),
      (customError.message = `duplicate category found ${err.keyValue.name} `);
  }
  res.status(customError.statusCode).json({ message: customError.message });
};
module.exports = errorHandler;
