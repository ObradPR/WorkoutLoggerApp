<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: POST, OPTIONS");

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "OPTIONS"){
        include "../../config/connection.php";
        include "exercise-functions.php";
        global $conn;

        $conn->beginTransaction();
        
        try{

            $data = file_get_contents("php://input");
            $data = json_decode($data);

            $weight = floatval($data->addWeight);
            $reps = intval($data->addReps);
            $rpe = intval($data->addRpe);
            $workoutId = intval($data->workoutId);
            $exerciseId = intval($data->exerciseId);
           
            $weightRegex = '/^(0|[1-9]\d{0,2})(\.\d{1,2})?$/';
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
                
                $insertSet = insertSet($weight, $reps, $rpe, $volume, $percentile[0], $percentile[1]);
                
                if($insertSet){
                    $setId = $conn->lastInsertId();

                    $insert = insertWESet($setId, $workoutId, $exerciseId);

                    if($insert){
                        $conn->commit();
                        http_response_code(201);
                        updateWorkoutTotals($workoutId);
                        $response = ["message" => "Successfully added set"];
                        echo json_encode($response);
                    }
                    else{
                        http_response_code(200);
                        $response = ["message" => "Unsuccessfully added set, error occured"];
                        echo json_encode($response);
                    }
                }
                else{
                    http_response_code(200);
                    $response = ["message" => "Unsuccessfully added set, error occured"];
                    echo json_encode($response);
                }
            }
        }
        catch(PDOException $ex){
            $conn->rollBack();
            $response = ["err" => $ex];
            echo json_encode($response);
            http_response_code(200);
        }

        $conn = null;
    }
    else{
        $response = ["message" => "Page does not exist!"];
        echo json_encode($response);
        http_response_code(404);
    }
?>