const sql = require("./db.js");

const Exercise = function(exercise) {
  this.exerciseName = exercise.exerciseName;
  this.suggestedSets = exercise.suggestedSets;
  this.suggestedReps = exercise.suggestedReps;
  this.superset = exercise.superset;
};

Exercise.create = (newExercise, result) => {
  sql.query("INSERT INTO exercises SET ?", newExercise, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created exercise: ", { id: res.insertId, ...newExercise });
    result(null, { id: res.insertId, ...newExercise });
  });
};

Exercise.findById = (exerciseId, result) => {
  sql.query(`SELECT * FROM exercises WHERE id = ${exerciseId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found exercise: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Exercise with the id
    result({ kind: "not_found" }, null);
  });
};

Exercise.getAll = result => {
  sql.query("SELECT * FROM exercises", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("exercises: ", res);
    result(null, res);
  });
};

Exercise.updateById = (id, exercise, result) => {
  sql.query(
    "UPDATE exercises SET exerciseName = ?, suggestedSets = ?, suggestedReps = ?, superset = ? WHERE id = ?",
    [
      exercise.exerciseName,
      exercise.suggestedSets,
      exercise.suggestedReps,
      exercise.superset,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Exercise with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated exercise: ", { id: id, ...exercise });
      result(null, { id: id, ...exercise });
    }
  );
};

Exercise.remove = (id, result) => {
  sql.query("DELETE FROM exercises WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Exercise with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted exercise with id: ", id);
    result(null, res);
  });
};

Exercise.removeAll = result => {
  sql.query("DELETE FROM exercises", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} exercises`);
    result(null, res);
  });
};

module.exports = Exercise;
