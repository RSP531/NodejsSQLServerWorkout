const Exercise = require("../models/exercises.model.js");

// Create and Save a new Exercise
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an Exercise
  const exercise = new Exercise({
    exerciseName: req.body.exerciseName,
    suggestedSets: req.body.suggestedSets,
    suggestedReps: req.body.suggestedReps,
    superset: req.body.superset
  });

  // Save Exercise in the database
  Exercise.create(exercise, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exercise."
      });
    else res.send(data);
  });
};

// Retrieve all Exercises from the database.
exports.findAll = (req, res) => {
  Exercise.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exercises."
      });
    else res.send(data);
  });
};

// Find a single Exercise with an exerciseId
exports.findOne = (req, res) => {
  Exercise.findById(req.params.exerciseId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Exercise with id ${req.params.exerciseId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Exercise with id " + req.params.exerciseId
        });
      }
    } else res.send(data);
  });
};

// Update an Exercise identified by the exerciseId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Exercise.updateById(
    req.params.exerciseId,
    new Exercise(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Exercise with id ${req.params.exerciseId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Exercise with id " + req.params.exerciseId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Exercise with the specified exerciseId in the request
exports.delete = (req, res) => {
  Exercise.remove(req.params.exerciseId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Exercise with id ${req.params.exerciseId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Exercise with id " + req.params.exerciseId
        });
      }
    } else res.send({ message: `Exercise was deleted successfully!` });
  });
};

// Delete all Exercises from the database.
exports.deleteAll = (req, res) => {
  Exercise.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all exercises."
      });
    else res.send({ message: `All Exercises were deleted successfully!` });
  });
};
