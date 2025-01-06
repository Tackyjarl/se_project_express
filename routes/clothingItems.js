const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");
const { validateCardBody, validateIds } = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", auth, validateCardBody, createItem);
router.delete("/:itemId", auth, validateIds, deleteItem);
router.put("/:itemId/likes", auth, validateIds, likeItem);
router.delete("/:itemId/likes", auth, validateIds, dislikeItem);

module.exports = router;
