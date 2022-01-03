const request = require("supertest");
const app = require("../../app");
const newTDD = require("../mock-data/new-tdd.json");

const endpointURL = "/tdd/";
let firstTDD, newTddId;
let nonExistingId = "62d1c86a24ac1c2b37cc054b";

const _test = { title: "Make integration test", done: true };

describe(endpointURL, () => {
  test("GET" + endpointURL, async () => {
    const response = await request(app).get(endpointURL);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTDD = response.body[0];
  });
  test("GET by Id" + endpointURL + ":tddId", async () => {
    const response = await request(app).get(endpointURL + firstTDD._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTDD.title);
    expect(response.body.done).toBe(firstTDD.done);
  });

  test("GET tdd id doesn't exist " + endpointURL + ":tddId", async () => {
    const response = await request(app).get(
      endpointURL + "61d1c86a34ac1c2b37cc054b"
    );
    expect(response.statusCode).toBe(404);
  });

  it("POST " + endpointURL, async () => {
    const response = await request(app).post(endpointURL).send(newTDD);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTDD.title);
    expect(response.body.done).toBe(newTDD.done);
    newTddId = response.body._id;
  });

  it(
    "should return error 500 on malformed data with POST" + endpointURL,
    async () => {
      const response = await request(app)
        .post(endpointURL)
        .send({ title: "Missing done Property" });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: "TDD validation failed: done: Path `done` is required.",
      });
    }
  );

  it("PUT" + endpointURL, async () => {
    const response = await request(app)
      .put(endpointURL + newTddId)
      .send(_test);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(_test.title);
    expect(response.body.done).toBe(_test.done);
  });
  it("should return 404 on PUT " + endpointURL, async () => {
    const response = await request(app)
      .put(endpointURL + nonExistingId)
      .send(_test);

    expect(response.statusCode).toBe(404);
  });
  test("HTTP DELETE", async () => {
    const response = await request(app)
      .delete(endpointURL + newTddId)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(_test.title);
    expect(response.body.done).toBe(_test.done);
  });
  test("HTTP DELETE 404", async () => {
    const response = await request(app)
      .delete(endpointURL + nonExistingId)
      .send();
    expect(response.statusCode).toBe(404);
  });
});
