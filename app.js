const express = require("express");
const tddRoutes = require("./routes/tdd.routes");
const mongdb = require("./mongodb/mongodb.connect");

const app = express();
app.use(express.json());
mongdb.connect();

app.use("/tdd", tddRoutes);

app.use((error, req, res, next) => {
  // console.log(error);
  res.status(500).json({ message: error.message });
});
app.get("/", (req, res) => {
  res.json("Hello World!!");
});

module.exports = app;
