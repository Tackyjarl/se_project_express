const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "673a4374f3eb270a1a672a15",
  };
  next();
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
