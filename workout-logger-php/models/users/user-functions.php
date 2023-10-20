<?php
    function checkInDatabase($column, $data){
        global $conn;

        $qry = "SELECT * FROM users WHERE $column = :data";

        $sel = $conn->prepare($qry);
        $sel->bindParam(":data", $data);
        $sel->execute();

        $response = $sel->fetch();

        if(empty($response)){
            return true;
        }
        else{
            return false;
        }
    }

    function insertUser($username, $email, $password, $birthDate, $height, $weight, $notification, $active, $regDate, $gender, $role){
        global $conn;

        $qry = "INSERT INTO users(username, email, `password`, date_of_birth, height, `user_bodyweight`, `notification`, active, register_date, gender_id, role_id) VALUE(:usr, :email, :pass, :dOBirth, :h, :w, :n, :a, :regDate, :g, :r)";

        $insert = $conn->prepare($qry);
        $insert->bindParam(":usr", $username);
        $insert->bindParam(":email", $email);
        $insert->bindParam(":pass", $password);
        $insert->bindParam(":dOBirth", $birthDate);
        $insert->bindParam(":h", $height);
        $insert->bindParam(":w", $weight);
        $insert->bindParam(":n", $notification);
        $insert->bindParam(":a", $active);
        $insert->bindParam(":regDate", $regDate);
        $insert->bindParam(":g", $gender);
        $insert->bindParam(":r", $role);

        $status = $insert->execute();

        return $status;
    }

    function insertBodyweight($userId, $regDate, $weight, $bodyfat){
        global $conn;

        $qry = "INSERT INTO bodyweight_measurements(user_id, bodyweight_date, bodyweight, body_fat_percentage) VALUE(:usr, :d, :bw, :bf)";

        $insert = $conn->prepare($qry);
        $insert->bindParam(":usr", $userId);
        $insert->bindParam(":d", $regDate);
        $insert->bindParam(":bw", $weight);
        $insert->bindParam(":bf", $bodyfat);

        $status = $insert->execute();

        return $status;
    }

    function sendContact($email, $title, $description, $dateSent){
        global $conn;

        $qry = "INSERT INTO messages(email, title, `description`, sent_date) VALUE(:e, :t, :d, :ds)";

        $insert = $conn->prepare($qry);
        $insert->bindParam(":e", $email);
        $insert->bindParam(":t", $title);
        $insert->bindParam(":d", $description);
        $insert->bindParam(":ds", $dateSent);

        $status = $insert->execute();

        return $status;
    }

    function getUser($username, $password){
        global $conn;

        $qry = "SELECT u.height, r.id_role, r.title, u.id_user, u.user_bodyweight, u.username, COALESCE(gt.goal_type_name, 'No goal') AS goal_type_name
        FROM users u JOIN roles r ON u.role_id = r.id_role
        LEFT JOIN goals g ON u.id_user = g.user_id
        LEFT JOIN goal_types gt ON g.goal_type_id = gt.id_goal_type
        WHERE u.username = :u AND u.password = :p
        ORDER BY gt.goal_type_name DESC
        LIMIT 1";


        $select = $conn->prepare($qry);
        $select->bindParam(":u", $username);
        $select->bindParam(":p", $password);
        $select->execute();
        $data = $select->fetch();

        return $data;
    }

    function loggedUserUpdate($userId, $active, $loginDate){
        global $conn;

        $qry = "UPDATE users SET active = :a, login_date = :d WHERE id_user = :id";

        $update = $conn->prepare($qry);
        $update->bindParam(":a", $active);
        $update->bindParam(":d", $loginDate);
        $update->bindParam(":id", $userId);

        $status = $update->execute();

        return $status;
    }

    function getUserByUsername($username){
        global $conn;

        $qry = "SELECT u.height, r.id_role, r.title, u.id_user, u.user_bodyweight, u.username, COALESCE(gt.goal_type_name, 'No goal') AS goal_type_name
        FROM users u JOIN roles r ON u.role_id = r.id_role
        LEFT JOIN goals g ON u.id_user = g.user_id
        LEFT JOIN goal_types gt ON g.goal_type_id = gt.id_goal_type
        WHERE u.username = :u
        ORDER BY gt.goal_type_name DESC
        LIMIT 1";

        $select = $conn->prepare($qry);
        $select->bindParam(":u", $username);
        $select->execute();
        $data = $select->fetch();


        $qry2 = "SELECT bwm.body_fat_percentage
        FROM bodyweight_measurements bwm
        JOIN users u ON bwm.user_id = u.id_user
        WHERE u.username = :u
        ORDER BY bwm.bodyweight_date DESC
        LIMIT 1";

        $select2 = $conn->prepare($qry2);
        $select2->bindParam(":u", $username);
        $select2->execute();
        $bodyFat = $select2->fetch();


        $qry3 = "SELECT COUNT(w.id_workout) AS workoutsCount
        FROM users u
        JOIN workouts w ON u.id_user = w.user_id
        WHERE w.workout_deleted = 0 AND u.username = :u";

        $select3 = $conn->prepare($qry3);
        $select3->bindParam(":u", $username);
        $select3->execute();
        $workoutCount = $select3->fetch();

        return [$data, $bodyFat, $workoutCount];
    }
?>