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

            $name = $data->name;
            $duration = intval($data->duration);
            $startTime = $data->workoutStartTime;
            $userId = $data->userId;
            $userBodyweight = floatval($data->userBodyweight);


            $numberRegex = '/^[1-9]([0-9]{1,2})?$/';

            $errors = 0;
            $response = [];

            if(!preg_match($numberRegex, $duration)){
                $errors++;
            }
            if($name == ''){
                $errors++;
            }
                        
            if($errors != 0){
                http_response_code(200);
                $response = ["message" => "Error during data processing. There was $errors errors"];
                echo json_encode($response);
            }
            else{
                $currentDate = date('Y-m-d');
                $fullDate = $currentDate." ".$startTime.":00";
                $workoutDate = date('Y-m-d H:i:s', strtotime($fullDate));
                $status = 0;
                
                $insert = insertWorkout($name, $duration, $workoutDate, $userBodyweight, $userId, $status);
                
                if($insert){
                    http_response_code(201);
                    $response = ["message" => "Successfully created workout"];
                    echo json_encode($response);
                }
                else{
                    http_response_code(200);
                    $response = ["message" => "Unsuccessfully created workout, error occured"];
                    echo json_encode($response);
                }
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