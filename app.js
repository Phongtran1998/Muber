const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(
    "mongodb://localhost/drivers",
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  );
}
require("./models/driver");
app.use(bodyParser.json());

require("./routes/routes")(app);

module.exports = app;
