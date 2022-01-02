const { response } = require("express");

const express = require("express");
const router = express.Router();
const TDDController = require("../controllers/tdd.controller");

router.post("/", TDDController.createTDD);

router.get("/", TDDController.getTDD);

module.exports = router;
