const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");

class UnAuthorisedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UnAuthorisedError;
