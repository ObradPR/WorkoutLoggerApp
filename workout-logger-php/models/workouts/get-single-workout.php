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

            $workoutId = $data;

            $workoutData = [];
            
            $workoutData = getWorkout($workoutId);

            if($workoutData[0]){
                $response = ["workout" => $workoutData[0], "sets" => $workoutData[1], "exercises" => $workoutData[2]];
                http_response_code(200);
            }
            else{
                $response = ["message" => "There is no workout."];
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