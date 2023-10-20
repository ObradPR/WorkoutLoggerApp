<?php
    function getUserMeasurements($userId){
        global $conn;

        $qry = "SELECT * FROM body_measurements
        WHERE user_id = :u
        ORDER BY body_measurement_date DESC";

        $sel = $conn->prepare($qry);
        $sel->bindParam(":u", $userId);
        $sel->execute();

        $measurements = $sel->fetchAll();

        return $measurements;
    }


    function insertMeasurement($userId,$chest, $neck, $rArm, $lArm, $rForearm, $lForearm, $waist, $rLeg, $lLeg, $rCalf, $lCalf, $currentDate){
        global $conn;

            $qry = "INSERT INTO body_measurements(user_id, body_measurement_date, chest_circumference, neck_circumference, right_arm_circumference, left_arm_circumference, right_forearm_circumference, left_forearm_circumference, right_leg_circumference, left_leg_circumference, waist_circumference, right_calf_circumference, left_calf_circumference) VALUE(:usr, :d, :c, :n, :ra, :la, :rf, :lf, :rl, :ll, :w, :rc, :lc)";
    
            $insert = $conn->prepare($qry);
            $insert->bindParam(":usr", $userId);
            $insert->bindParam(":d", $currentDate);
            $insert->bindParam(":n", $neck);
            $insert->bindParam(":c", $chest);
            $insert->bindParam(":ra", $rArm);
            $insert->bindParam(":la", $lArm);
            $insert->bindParam(":rf", $rForearm);
            $insert->bindParam(":lf", $lForearm);
            $insert->bindParam(":rl", $rLeg);
            $insert->bindParam(":ll", $lLeg);
            $insert->bindParam(":rc", $rCalf);
            $insert->bindParam(":lc", $lCalf);
            $insert->bindParam(":w", $waist);
    
            $status = $insert->execute();
    
            return $status;
    }

    function deleteMeasurement($userId, $date){
        global $conn;

        $qry = "DELETE FROM body_measurements
        WHERE user_id = :usr AND body_measurement_date = :d";

        $delete = $conn->prepare($qry);
        $delete->bindParam(":usr", $userId);
        $delete->bindParam(":d", $date);

        $status = $delete->execute();

        return $status;
    }

?>