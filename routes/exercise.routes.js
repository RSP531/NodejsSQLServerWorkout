module.exports = app => {
  const exercises = require("../controllers/exercise.controller.js");

  // Create a new Exercise
  app.post("/exercises", exercises.create);

  // Retrieve all Exercises
  app.get("/exercises", exercises.findAll);

  // Retrieve a single Exercise with exerciseId
  app.get("/exercises/:exerciseId", exercises.findOne);

  // Update an Exercise with exerciseId
  app.put("/exercises/:exerciseId", exercises.update);

  // Delete an Exercise with an exerciseId
  app.delete("/exercises/:exerciseId", exercises.delete);

  // Create a new Exercise
  app.delete("/exercises", exercises.deleteAll);
};
