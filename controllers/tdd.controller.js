const TDD = require("../model/tdd.model");

createTDD = async (req, res, next) => {
  try {
    const result = await TDD.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

getTDD = async (req, res, next) => {
  try {
    const result = await TDD.find({});
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTDD,
  getTDD,
};
