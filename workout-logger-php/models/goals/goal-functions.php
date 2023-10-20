<?php
    function getGoalTypes(){
        global $conn;

        $qry = "SELECT * FROM goal_types";

        $data = $conn->query($qry)->fetchAll();

        return $data;
    }

    function  insertGoal($userId, $bw, $bf, $goalType){
        global $conn;

        $qry = "INSERT INTO goals(user_id, goal_type_id, target_weight, target_bodyfat_percentage) VALUE(:usr, :t, :bw, :bf)";

        $insert = $conn->prepare($qry);
        $insert->bindParam(":usr", $userId);
        $insert->bindParam(":bw", $bw);
        $insert->bindParam(":bf", $bf);
        $insert->bindParam(":t", $goalType);

        $status = $insert->execute();

        return $status;
    }
?>