const User = require("../models/user");
const {
  INTERNAL_SERVICE_ERROR,
  SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  USER_NOT_FOUND,
  INVALID_ITEM_ID,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(err);
      res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
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
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};
