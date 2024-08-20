const { StatusCodes } = require("http-status-codes");

const NotFoundError = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "404 - Route Not Found" });
};

module.exports = NotFoundError;
