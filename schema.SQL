DROP DATABASE IF EXISTS WorkoutReactNativeApp;

CREATE DATABASE WorkoutReactNativeApp;

USE DATABASE WorkoutReactNativeApp;

CREATE TABLE IF NOT EXISTS exercises (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  exerciseName varchar(255) NOT NULL,
  suggestedSets varchar(255) NOT NULL,
  suggestedReps varchar(255) NOT NULL,
  superset BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO exercises (exerciseName,suggestedSets,suggestedReps,superset) values (exerciseName,suggestedSets,suggestedReps,superset);
INSERT INTO exercises (exerciseName,suggestedSets,suggestedReps,superset) values (exerciseName,suggestedSets,suggestedReps,superset);