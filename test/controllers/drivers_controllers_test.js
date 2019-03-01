const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const Driver = mongoose.model("driver");
describe("Drivers controllers", () => {
  it("Post to /api/drivers create a new driver", done => {
    Driver.countDocuments().then(count => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com", name: "john" })
        .end((err, res) => {
          Driver.countDocuments().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
  it("Put to /api/drivers/:id edit an existing driver", done => {
    const driver = new Driver({ name: "tt", email: "t@t.t", driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "t@t.t" }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });
  it("Delete to /api/drivers/:id delete an existing driver", done => {
    const driver = new Driver({ name: "qq", email: "q@q.q" });
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: "q@q.q" }).then(driver => {
            assert(driver === null);
            done();
          });
        });
    });
  });
  it("GET to /api/drivers finds drivers in a location", done => {
    const seattleDriver = new Driver({
      name: "helen",
      email: "helen@seattle.com",
      geometry: { type: "Point", coordinates: [-122.4759902, 47.6147628] }
    });
    const miamiDriver = new Driver({
      name: "thomas",
      email: "thomas@miami.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] }
    });
    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80&lat=25")
        .end((err, res) => {
          assert(res.body.length === 1);
          assert(res.body[0].email === "thomas@miami.com");
          done();
        });
    });
  });
});
