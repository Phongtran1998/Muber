const DriversControllers = require("../controllers/drivers_controllers");

module.exports = app => {
  app.get("/api", DriversControllers.greeting);
  app.post("/api/drivers", DriversControllers.create);
  app.put("/api/drivers/:id", DriversControllers.edit);
  app.delete("/api/drivers/:id", DriversControllers.delete);
  app.get("/api/drivers", DriversControllers.index);
};
