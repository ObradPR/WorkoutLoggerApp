<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: POST, OPTIONS");

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "OPTIONS"){
        include "../../config/connection.php";
        include "workout-functions.php";
        
        try{

            $data = file_get_contents("php://input");
            $data = json_decode($data);

            $userId = $data;

            $workoutsData = [];
            
            $workoutsData = getUserWorkouts($userId);

            if($workoutsData[0]){
                $response = ["workouts" => $workoutsData[0], "sets" => $workoutsData[1], "exercises" => $workoutsData[2]];
                http_response_code(200);
            }
            else{
                $response = ["message" => "There are no workouts logged, log now."];
                http_response_code(200);
            }
            
            echo json_encode($response);
        }
        catch(PDOException $ex){
            $response = ["err" => $ex];
            echo json_encode($response);
            http_response_code(200);
        }
    }
    else{
        $response = ["message" => "Page does not exist!"];
        echo json_encode($response);
        http_response_code(404);
    }
?>