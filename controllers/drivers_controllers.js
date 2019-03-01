const mongoose = require("mongoose");
const Driver = mongoose.model("driver");
module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  async index(req, res) {
    try {
      const { lng, lat } = req.query;

      const drivers = await Driver.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            distanceField: "dist.calculated", // required
            maxDistance: 200000,
            spherical: true
          }
        }
      ]);
      res.send(drivers);
    } catch (e) {
      res.status(422).send(e.message);
    }
  },
  async create(req, res) {
    try {
      const driver = new Driver({ name: req.body.name, email: req.body.email });
      await driver.save();
      res.send(driver);
    } catch (e) {
      res.status(422).send({ error: e.message });
    }
  },
  async edit(req, res) {
    const driverId = req.params.id;
    try {
      await Driver.updateOne({ _id: driverId }, req.body);
      const driver = await Driver.findOne({ _id: driverId });
      res.send(driver);
    } catch (e) {
      res.status(422).send({ error: e.message });
    }
  },
  async delete(req, res) {
    const driverId = req.params.id;
    try {
      const driver = await Driver.deleteOne({ _id: driverId });
      res.status(204).send(driver);
    } catch (e) {
      res.status(422).send(e.message);
    }
  }
};
