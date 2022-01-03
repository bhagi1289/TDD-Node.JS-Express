const TddController = require("../../controllers/tdd.controller");
const TddModel = require("../../model/tdd.model");
const httpMocks = require("node-mocks-http");
const newTdd = require("../mock-data/new-tdd.json");
const allTdds = require("../mock-data/all-tdds.json");

// TddModel.create = jest.fn();
// TddModel.find = jest.fn();
// TddModel.findById = jest.fn();
// TddModel.findByIdAndUpdate = jest.fn();
// TddModel.findByIdAndDelete = jest.fn();

jest.mock("../../model/tdd.model");

let req, res, next;
let tddId = "61d1c86a24ac1c2b37cc054b";

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TddController.deleteTddById", () => {
  it("should have deleteTddById function", () => {
    expect(typeof TddController.deleteTddById).toBe("function");
  });
  it("should call findByIdAndDelete", async () => {
    req.params.tddId = tddId;
    await TddController.deleteTddById(req, res, next);
    expect(TddModel.findByIdAndDelete).toBeCalledWith(tddId);
  });

  it("should return 200 OK and deleted the tddModel", async () => {
    TddModel.findByIdAndDelete.mockReturnValue(newTdd);
    await TddController.deleteTddById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTdd);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors in delete", async () => {
    const errorMessage = { message: "Error" };
    const rejectPromise = Promise.reject(errorMessage);
    TddModel.findByIdAndDelete.mockReturnValue(rejectPromise);
    await TddController.deleteTddById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
  it("should handle 404 error", async () => {
    TddModel.findByIdAndDelete.mockReturnValue(null);
    await TddController.deleteTddById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe("TddController.UpdateById", () => {
  it("should have updateTddById function", () => {
    expect(typeof TddController.updateTddById).toBe("function");
  });
  it("should update with tddModel.findByIdaAndUpdate", async () => {
    req.params.tddId = tddId;
    req.body = newTdd;
    await TddController.updateTddById(req, res, next);
    expect(TddModel.findByIdAndUpdate).toHaveBeenCalledWith(tddId, newTdd, {
      new: true,
      useFindAndModify: false,
    });
  });

  it("should return json body and status code 200", async () => {
    req.params.tddId = tddId;
    req.body = newTdd;
    TddModel.findByIdAndUpdate.mockReturnValue(newTdd);
    await TddController.updateTddById(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTdd);
  });

  it("should handle the errors on UpdateById", async () => {
    const errorMessage = { message: "Error" };
    const rejectPromise = Promise.reject(errorMessage);
    TddModel.findByIdAndUpdate.mockReturnValue(rejectPromise);
    await TddController.updateTddById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it("should handle 404 error", async () => {
    TddModel.findByIdAndUpdate.mockReturnValue(null);
    await TddController.updateTddById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe("TddController.getTddById", () => {
  it("should have getTddById function", () => {
    expect(typeof TddController.getTddById).toBe("function");
  });
  it("should call TddModel.findById with route parameters", async () => {
    req.params.tddId = tddId;
    await TddController.getTddById(req, res, next);
    expect(TddModel.findById).toBeCalledWith(tddId);
  });

  it("should return json body and return status code 200", async () => {
    TddModel.findById.mockReturnValue(newTdd);
    // TddModel.findById.mockImplementationOnce(() => {
    //   lean: jest.fn().mockReturnValue(newTdd);
    // });
    await TddController.getTddById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTdd);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "error finding TddModel" };
    const rejectPromise = Promise.reject(errorMessage);
    TddModel.findById.mockReturnValue(rejectPromise);
    await TddController.getTddById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it("should return 404 when item doesn't exist", async () => {
    TddModel.findById.mockReturnValue(null);
    await TddController.getTddById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe("TddController.getTDD", () => {
  it("should have a getTDD function", () => {
    expect(typeof TddController.getTDD).toBe("function");
  });
  it("should call TDDModel.find({})", async () => {
    await TddController.getTDD(req, res, next);
    expect(TddModel.find).toHaveBeenCalledWith({});
  });
  it("should return response status 200 and all TDDs", async () => {
    TddModel.find.mockReturnValue(allTdds);
    await TddController.getTDD(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTdds);
  });

  it("should handle errors in getTDD", async () => {
    const errorMessage = { message: "Error finding" };
    const rejectPromise = Promise.reject(errorMessage);
    TddModel.find.mockReturnValue(rejectPromise);
    await TddController.getTDD(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("TddController.createTDD", () => {
  beforeEach(() => {
    req.body = newTdd;
  });

  it("should have a createTDD function", () => {
    expect(typeof TddController.createTDD).toBe("function");
  });
  it("should call TDDModel.create", () => {
    TddController.createTDD(req, res, next);
    expect(TddModel.create).toBeCalledWith(newTdd);
  });
  it("should return 201 response code", async () => {
    await TddController.createTDD(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response", async () => {
    TddModel.create.mockReturnValue(newTdd);
    await TddController.createTDD(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTdd);
  });

  it("should handle errors in CreateTDD", async () => {
    const errorMessage = { message: "Done property Missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    TddModel.create.mockReturnValue(rejectedPromise);
    await TddController.createTDD(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
