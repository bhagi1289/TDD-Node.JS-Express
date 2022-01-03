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

getTddById = async (req, res, next) => {
  try {
    const result = await TDD.findById(req.params.tddId);
    if (result) res.status(200).json(result);
    else res.status(404).json(result);
  } catch (error) {
    next(error);
  }
};

updateTddById = async (req, res, next) => {
  try {
    const result = await TDD.findByIdAndUpdate(req.params.tddId, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (result) res.status(200).json(result);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};

deleteTddById = async (req, res, next) => {
  try {
    const result = await TDD.findByIdAndDelete(req.params.tddId);
    if (result) res.status(200).json(result);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createTDD,
  getTDD,
  getTddById,
  updateTddById,
  deleteTddById,
};
