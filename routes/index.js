const router = require("express").Router();
const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const { NotFoundError } = require("../utils/errors/NotFoundError");

router.use("/items", clothingItem);
router.use("/users", userRouter);
router.post("/signin", login);
router.post("/signup", createUser);
router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
