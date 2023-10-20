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

            $workout = intval($data->workout);
            $exercise = intval($data->exercise);

            $response = [];
            
            $insert = insertExerciseInWorkout($workout, $exercise);
            
            if($insert){
                http_response_code(201);
                $response = ["message" => "Successfully added exercise"];
                echo json_encode($response);
            }
            else{
                http_response_code(200);
                $response = ["message" => "Unsuccessfully added exercise, error occured"];
                echo json_encode($response);
            }
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