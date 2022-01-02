const request = require("supertest");
const app = require("../../app");
const newTDD = require("../mock-data/new-tdd.json");

const endpointURL = "/tdd/";

describe(endpointURL, () => {
  test("GET" + endpointURL, async () => {
    const response = await request(app).get(endpointURL);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
  });
  it("POST " + endpointURL, async () => {
    const response = await request(app).post(endpointURL).send(newTDD);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTDD.title);
    expect(response.body.done).toBe(newTDD.done);
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
});
