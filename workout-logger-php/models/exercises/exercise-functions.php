<?php
    function getExercises(){
        global $conn;

        $qry = "SELECT * FROM exercises";

        $exercises = $conn->query($qry)->fetchAll();

        $qry2 = "SELECT * FROM muscle_groups";

        $muscleGroups = $conn->query($qry2)->fetchAll();

        $qry3 = "SELECT * FROM exercises e
        JOIN exercises_muscle_groups emg ON e.id_exercise = emg.exercise_id";

        $exercisesMG = $conn->query($qry3)->fetchAll();


        return [$exercises, $muscleGroups, $exercisesMG];
    }

    function calculatePercentile($weight, $reps){
        $oneRepMax = $weight * ($reps ** 0.1);

        $percentile = ($weight * 100) / $oneRepMax;

        return [$percentile, $oneRepMax];
    }

    function insertSet($weight, $reps, $rpe, $volume, $percentile, $orm){
        global $conn;

        $qry = "INSERT INTO `sets`(reps, `weight`, rpe, volume, percentile, orm_weight) VALUE(:r, :w, :rpe, :v, :p, :orm)";

        $insert = $conn->prepare($qry);
        $insert->bindParam(":r", $reps);
        $insert->bindParam(":w", $weight);
        $insert->bindParam(":rpe", $rpe);
        $insert->bindParam(":v", $volume);
        $insert->bindParam(":p", $percentile);
        $insert->bindParam(":orm", $orm);

        $status = $insert->execute();

        return $status;
    }

    function insertWESet($setId, $workoutId, $exerciseId){
        global $conn;

        $qry = "INSERT INTO workouts_exercises(set_id, exercise_id, workout_id) VALUE(:s, :e, :w)";

        $insert = $conn->prepare($qry);
        $insert->bindParam(":s", $setId);
        $insert->bindParam(":e", $exerciseId);
        $insert->bindParam(":w", $workoutId);

        $status = $insert->execute();

        return $status;
    }

    function editSet($setId, $reps, $weight, $rpe, $percentile, $orm, $volume){
        global $conn;

        $qry = "UPDATE `sets` SET reps = :r, `weight` = :w, rpe = :rpe, percentile = :p, orm_weight = :orm, volume = :v WHERE id_set = :idSet";

        $update = $conn->prepare($qry);

        $update->bindParam(":r", $reps);
        $update->bindParam(":w", $weight);
        $update->bindParam(":rpe", $rpe);
        $update->bindParam(":p", $percentile);
        $update->bindParam(":idSet", $setId);
        $update->bindParam(":orm", $orm);
        $update->bindParam(":v", $volume);

        $status = $update->execute();

        return $status;
    }

    function deleteSet($setId){
        global $conn;

        $qry1 = "DELETE FROM workouts_exercises WHERE set_id = :s";

        $del1 = $conn->prepare($qry1);
        $del1->bindParam(":s", $setId);

        $status1 = $del1->execute();

        $qry2 = "DELETE FROM `sets` WHERE id_set = :si";

        $del2 = $conn->prepare($qry2);
        $del2->bindParam(":si", $setId);

        $status2 = $del2->execute();

        if($status1 && $status2){
            return true;
        }
        else{
            return false;
        }
    }

    function getUserExerciseSets($userId, $exerciseId){
        global $conn;

        $qry = "SELECT s.reps, s.weight, w.workout_date
        FROM users u
        JOIN workouts w ON u.id_user = w.user_id
        JOIN workouts_exercises we ON w.id_workout = we.workout_id
        JOIN `sets` s ON s.id_set = we.set_id
            WHERE we.exercise_id = :exId 
            AND u.id_user = :usId 
            AND w.workout_deleted = 0";

        $sel = $conn->prepare($qry);
        $sel->bindParam(":exId", $exerciseId);
        $sel->bindParam(":usId", $userId);

        $sel->execute();

        $sets = $sel->fetchAll();


        return $sets;
    }

    function updateWorkoutTotals($workoutId){
        global $conn;
        $volume = 0;
        $resp = 0;
        $sets = 0;


        // Sets
        $qry = "SELECT COUNT(*) AS setsCount
        FROM workouts_exercises
        WHERE workout_id = :wId AND set_id IS NOT NULL";

        $selSets = $conn->prepare($qry);
        $selSets->bindParam(":wId", $workoutId);

        $selSets->execute();
        $sets = $selSets->fetch(PDO::FETCH_ASSOC);
        $sets = $sets['setsCount'];

        // Reps
        $qry2 = "SELECT SUM(reps) AS repsSum FROM `sets` s
        JOIN workouts_exercises we ON s.id_set = we.set_id
        WHERE we.workout_id = :wId";

        $selReps = $conn->prepare($qry2);
        $selReps->bindParam(":wId", $workoutId);

        $selReps->execute();
        $reps = $selReps->fetch(PDO::FETCH_ASSOC);
        $reps = $reps['repsSum'];


        // Volume
        $qry3 = "SELECT SUM(volume) AS volumeSum FROM `sets` s
        JOIN workouts_exercises we ON s.id_set = we.set_id
        WHERE we.workout_id = :wId";

        $selVolume = $conn->prepare($qry3);
        $selVolume->bindParam(":wId", $workoutId);

        $selVolume->execute();
        $volume = $selVolume->fetch(PDO::FETCH_ASSOC);
        $volume = $volume['volumeSum'];


        // Inset in workouts table
        $qry4 = "UPDATE workouts SET total_sets = :setsCount, total_reps = :repsSum, total_volume = :volumeSum
        WHERE id_workout = :wId";

        $update = $conn->prepare($qry4);
        $update->bindParam(":setsCount", $sets);
        $update->bindParam(":repsSum", $reps);
        $update->bindParam(":volumeSum", $volume);
        $update->bindParam(":wId", $workoutId);
        
        $status = $update->execute();

        return $status;
    }
?>