const TddController = require("../../controllers/tdd.controller");
const TddModel = require("../../model/tdd.model");
const httpMocks = require("node-mocks-http");
const newTdd = require("../mock-data/new-tdd.json");
const allTdds = require("../mock-data/all-tdds.json");

TddModel.create = jest.fn();
TddModel.find = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
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
