const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (e) {
    const err = new Error("Authorization required");
    err.statusCode = UNAUTHORIZED;
    // return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
    next(err);
  }
};
