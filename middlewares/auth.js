const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors/UnauthorizedError");
const { JWT_SECRET } = require("../utils/config");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError(err.message));
  }
};
