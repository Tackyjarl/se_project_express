const ClothingItem = require("../models/clothingItem");
const {
  INTERNAL_SERVICE_ERROR,
  SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  ITEM_NOT_FOUND,
  INVALID_ITEM_ID,
  FORBIDDEN,
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
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
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
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You do not have permission to delete this item" });
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(200).send({ message: "Item deletion successful" })
        );
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: INVALID_ITEM_ID });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: ITEM_NOT_FOUND });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};

module.exports.likeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: INVALID_ITEM_ID });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: ITEM_NOT_FOUND });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};

module.exports.dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: INVALID_ITEM_ID });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: ITEM_NOT_FOUND });
      }
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: SERVER_ERROR });
    });
};
