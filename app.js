require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const { errorHandler } = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://www.tackyjarl.crabdance.com",
      "https://api.tackyjarl.crabdance.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(requestLogger);
app.use("/", routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
