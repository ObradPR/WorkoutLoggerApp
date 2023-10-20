<?php
    function getUserBodyweights($userId){
        global $conn;

        $qry = "SELECT * FROM bodyweight_measurements
        WHERE user_id = :u
        ORDER BY bodyweight_date DESC";

        $sel = $conn->prepare($qry);
        $sel->bindParam(":u", $userId);
        $sel->execute();

        $bodyweights = $sel->fetchAll();

        return $bodyweights;
    }

    function  insertBodyweight($userId, $bw, $bf, $currentDate){
        global $conn;

        $qry = "INSERT INTO bodyweight_measurements(user_id, bodyweight_date, bodyweight, body_fat_percentage) VALUE(:usr, :d, :bw, :bf)";

        $insert = $conn->prepare($qry);
        $insert->bindParam(":usr", $userId);
        $insert->bindParam(":bw", $bw);
        $insert->bindParam(":bf", $bf);
        $insert->bindParam(":d", $currentDate);

        $status = $insert->execute();

        $qry2 = "UPDATE users SET user_bodyweight = :bw WHERE id_user = :usr";

        $update = $conn->prepare($qry2);
        $update->bindParam(":usr", $userId);
        $update->bindParam(":bw", $bw);
      

        $status2 = $update->execute();

        return $status;
    }

    function deleteBodyweight($userId, $date){
        global $conn;

        $qry = "DELETE FROM bodyweight_measurements
        WHERE user_id = :usr AND bodyweight_date = :d";

        $delete = $conn->prepare($qry);
        $delete->bindParam(":usr", $userId);
        $delete->bindParam(":d", $date);

        $status = $delete->execute();

        $qry2 = "SELECT bwm.bodyweight FROM bodyweight_measurements bwm
        JOIN users u ON u.id_user = bwm.user_id
        WHERE u.id_user = :usr
        ORDER BY bwm.bodyweight_date DESC
        LIMIT 1";

        $sel = $conn->prepare($qry2);
        $sel->bindParam(":usr", $userId);

        $sel->execute();
        $bw = $sel->fetchColumn();

        $qry3 = "UPDATE users SET user_bodyweight = :bw
        WHERE id_user = :usr";

        $update = $conn->prepare($qry3);
        $update->bindParam(":usr", $userId);
        $update->bindParam(":bw", $bw);
        
        $status3 = $update->execute();

        return $status;
    }

    function  getUserGoal($userId){
        global $conn;

        $qry = "SELECT * FROM goals g
        JOIN goal_types gt ON g.goal_type_id = gt.id_goal_type
        WHERE user_id = :u
        ORDER BY id_goal DESC
        LIMIT 1";

        $sel = $conn->prepare($qry);
        $sel->bindParam(":u", $userId);
        $sel->execute();

        $goal = $sel->fetch();

        return $goal;
    }
?>