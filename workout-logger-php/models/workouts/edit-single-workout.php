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

            $workoutId = $data->id;
            $workoutName = $data->editName;
            $workoutDuration = $data->editDuration;
            $hours = $data->editHours;
            $min = $data->editMinutes;
            $date = $data->date;
            $year = $data->year;
            $month = $data->month;

            $time = sprintf("%04d-%02d-%02d", $year, $month, $date).' '.sprintf("%02d:%02d", $hours, $min);
            
            $edit = editWorkout($workoutId, $workoutName, $workoutDuration, $time);

            if($edit){
                $response = ["message" => "Successfuly edited workout."];
                http_response_code(200);
            }
            else{
                $response = ["message" => "Error during an edit."];
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