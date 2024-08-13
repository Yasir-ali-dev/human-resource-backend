const { UnAuthorisedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthorisedError("authheader - Authentication Failed");
  }
  const token = authHeader.split(" ")[1];
  const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = { email: payload.email };
  if (!payload) {
    throw new UnAuthorisedError("Authentication Failed");
  }
  next();
};

module.exports = authentication;
