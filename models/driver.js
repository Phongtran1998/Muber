const mongoose = require("mongoose");
const { Schema } = mongoose;

const PointSchema = new Schema({
  type: { type: String, default: "Point" },
  coordinates: { type: [Number], index: "2dsphere" }
});

const DriverSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  driving: { type: Boolean, default: false },
  geometry: PointSchema
});

mongoose.model("driver", DriverSchema);
