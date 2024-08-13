const CustomError = require("./CustomError");
const BadRequestError = require("./BadRequestError");
const NotFoundError = require("./NotFoundError");
const UnAuthorisedError = require("./UnAuthorisedError");

module.exports = {
  UnAuthorisedError,
  CustomError,
  NotFoundError,
  BadRequestError,
};
