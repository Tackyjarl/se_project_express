const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  INTERNAL_SERVICE_ERROR,
  SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  USER_NOT_FOUND,
  INVALID_ITEM_ID,
  DUPLICATE_ERROR,
  CONFLICT_ERROR,
  UNAUTHORIZED,
  INVALID_ENTRY_ERROR,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: USER_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: INVALID_ITEM_ID });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res
        .status(201)
        .send({ name: user.name, avatar: user.avatar, email: user.email })
    )
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        return res.status(DUPLICATE_ERROR).send({ message: CONFLICT_ERROR });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "Invalid email or password") {
        return res.status(UNAUTHORIZED).send({ message: INVALID_ENTRY_ERROR });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: USER_NOT_FOUND });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};
