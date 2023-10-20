<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: POST, OPTIONS");

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "OPTIONS"){
        include "../../config/connection.php";
        include "exercise-functions.php";
        
        try{

            $data = file_get_contents("php://input");
            $data = json_decode($data);

            $setId = $data->setId;
            $reps = $data->editReps;
            $weight = $data->editWeight;
            $rpe = $data->editRpe;
            $workoutId = $data->workoutId;

            $weightRegex = '/^(0|[1-9]\d{0,2})(\.\d{2})?$/';
            $repsRegex = '/^[1-9][0-9]?$/';

            $errors = 0;
            $response = [];

            if(!preg_match($weightRegex, $weight)){
                $errors++;
            }
            
            if(!preg_match($repsRegex, $reps)){
                $errors++;
            }
                        
            if($errors != 0){
                http_response_code(200);
                $response = ["message" => "Error during data processing. There was $errors errors"];
                echo json_encode($response);
            }
            else{
                $volume = $reps * $weight;
                $percentile = calculatePercentile($weight, $reps);

                $edit = editSet($setId, $reps, $weight, $rpe, $percentile[0], $percentile[1], $volume);

                if($edit){
                    updateWorkoutTotals($workoutId);
                    $response = ["message" => "Successfuly edited set."];
                    http_response_code(200);
                }
                else{
                    $response = ["message" => "Error during an edit."];
                    http_response_code(200);
                }
                
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