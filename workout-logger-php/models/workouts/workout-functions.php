<?php
    function insertWorkout($name, $duration, $workoutDate, $userBodyweight, $userId, $status){
        global $conn;

        $qry = "INSERT INTO workouts(workout_name, duration, workout_date, user_bodyweight, user_id, workout_deleted) VALUE(:n, :d, :w, :u, :u_id, :del)";

        $insert = $conn->prepare($qry);
        $insert->bindParam(":n", $name);
        $insert->bindParam(":d", $duration);
        $insert->bindParam(":w", $workoutDate);
        $insert->bindParam(":u", $userBodyweight);
        $insert->bindParam(":u_id", $userId);
        $insert->bindParam(":del", $status);

        $status = $insert->execute();

        return $status;
    }

    function getUserWorkouts($userId){
        global $conn;

        $qry = "SELECT *
        FROM workouts w
        WHERE w.user_id = :id AND w.workout_deleted = 0
        GROUP BY w.id_workout";

        $select = $conn->prepare($qry);
        $select->bindParam(":id", $userId);
        $select->execute();

        $workouts = $select->fetchAll();


        // Retriving all the sets done
        $qry2 = "SELECT we.workout_id, we.exercise_id, s.reps, s.rpe, s.weight, s.volume, s.percentile
        FROM workouts w JOIN workouts_exercises we ON w.id_workout = we.workout_id
        JOIN `sets` s ON we.set_id = s.id_set
        JOIN exercises e ON we.exercise_id = e.id_exercise
        WHERE w.user_id = :id AND w.workout_deleted = 0";

        $select2 = $conn->prepare($qry2);
        $select2->bindParam(":id", $userId);
        $select2->execute();

        $sets = $select2->fetchAll();

        // Retriving all the exercises done
        $qry3 ="SELECT DISTINCT we.exercise_id, e.exercise_name, e.exercise_description, we.workout_id
        FROM workouts w
        JOIN workouts_exercises we ON w.id_workout = we.workout_id
        JOIN exercises e ON we.exercise_id = e.id_exercise
        WHERE w.user_id = :id AND w.workout_deleted = 0";

        $select3 = $conn->prepare($qry3);
        $select3->bindParam(":id", $userId);
        $select3->execute();

        $exercises = $select3->fetchAll();

        return [$workouts, $sets, $exercises];
    }

    function removeWorkout($removed, $id){
        global $conn;

        $qry = "UPDATE workouts SET workout_deleted=:rem WHERE id_workout=:id";

        $update = $conn->prepare($qry);
        $update->bindParam(":rem", $removed);
        $update->bindParam(":id", $id);
       

        $status = $update->execute();

        return $status;
    }

    function getWorkout($workoutId){
        global $conn;

        $qry = "SELECT *
        FROM workouts
        WHERE id_workout = :id";

        $select = $conn->prepare($qry);
        $select->bindParam(":id", $workoutId);
        $select->execute();

        $workout = $select->fetch();


        // Retriving all the sets done
        $qry2 = "SELECT we.workout_id, we.exercise_id, s.reps, s.rpe, s.weight, s.volume, s.percentile, s.id_set, s.orm_weight
        FROM workouts w JOIN workouts_exercises we ON w.id_workout = we.workout_id
        JOIN `sets` s ON we.set_id = s.id_set
        JOIN exercises e ON we.exercise_id = e.id_exercise
        WHERE w.id_workout = :id";

        $select2 = $conn->prepare($qry2);
        $select2->bindParam(":id", $workoutId);
        $select2->execute();

        $sets = $select2->fetchAll();

        // Retriving all the exercises done
        $qry3 ="SELECT DISTINCT we.exercise_id, e.exercise_name, e.exercise_description, we.workout_id
        FROM workouts w
        JOIN workouts_exercises we ON w.id_workout = we.workout_id
        JOIN exercises e ON we.exercise_id = e.id_exercise
        WHERE w.id_workout = :id";

        $select3 = $conn->prepare($qry3);
        $select3->bindParam(":id", $workoutId);
        $select3->execute();

        $exercises = $select3->fetchAll();

        return [$workout, $sets, $exercises];
    }

    function editWorkout($workoutId, $workoutName, $workoutDuration, $time){
        global $conn;

        $qry = "UPDATE workouts SET workout_name=:n, duration=:d, workout_date=:wd WHERE id_workout=:id";

        $update = $conn->prepare($qry);
        $update->bindParam(":id", $workoutId);
        $update->bindParam(":n", $workoutName);
        $update->bindParam(":d", $workoutDuration);
        $update->bindParam(":wd", $time);
       

        $status = $update->execute();

        return $status;
    }

    function insertExerciseInWorkout($workout, $exercise){
        global $conn;

        $qry = "INSERT INTO workouts_exercises(workout_id, exercise_id) VALUE(:w, :e)";

        $insert = $conn->prepare($qry);
        $insert->bindParam(":w", $workout);
        $insert->bindParam(":e", $exercise);

        $status = $insert->execute();

        return $status;
    }

    function deleteExercise($workoutId, $exerciseId){
        global $conn;

        $qry = "DELETE FROM workouts_exercises WHERE workout_id = :w AND exercise_id = :e";

        $delete = $conn->prepare($qry);
        $delete->bindParam(":w", $workoutId);
        $delete->bindParam(":e", $exerciseId);

        $status = $delete->execute();

        return $status;
    }

    function updateTotal($volume, $reps, $sets, $workoutId){
        global $conn;

        $qry = "UPDATE workouts SET total_volume = :v, total_reps = :r, total_sets = :s WHERE id_workout = :w";

        $update = $conn->prepare($qry);
        $update->bindParam(":w", $workoutId);
        $update->bindParam(":v", $volume);
        $update->bindParam(":r", $reps);
        $update->bindParam(":s", $sets);

        $status = $update->execute();

        return $status;
    }
?>