const router = require("express").Router();
const clothingItem = require("./clothingItems");
const userRouter = require("./users");

router.use("/items", clothingItem);
router.use("/users", userRouter);

module.exports = router;
