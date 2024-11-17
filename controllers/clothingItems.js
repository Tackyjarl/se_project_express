const ClothingItem = require("../models/clothingItem");
const {
  INTERNAL_SERVICE_ERROR,
  SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  ITEM_NOT_FOUND,
  INVALID_ITEM_ID,
} = require("../utils/errors");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.send(item))
    .catch((err) => {
      console.log(err);
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};

module.exports.createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndRemove(itemId)
    .orFail()
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: ITEM_NOT_FOUND });
      }
      return res.status(200).send({ message: "Item deletion successful" });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: INVALID_ITEM_ID });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};

module.exports.likeItem = (req) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

module.exports.dislikeItem = (req) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );