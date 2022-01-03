const { response } = require("express");

const express = require("express");
const router = express.Router();
const TDDController = require("../controllers/tdd.controller");

router.post("/", TDDController.createTDD);

router.get("/", TDDController.getTDD);

router.get("/:tddId", TDDController.getTddById);

router.put("/:tddId", TDDController.updateTddById);

router.delete("/:tddId", TDDController.deleteTddById);

module.exports = router;
