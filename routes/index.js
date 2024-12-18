const router = require("express").Router();
const { NOT_FOUND, ROUTER_NOT_FOUND } = require("../utils/errors");
const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");

router.use("/items", clothingItem);
router.use("/users", userRouter);
router.post("/signin", login);
router.post("/signup", createUser);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: ROUTER_NOT_FOUND });
});

module.exports = router;
