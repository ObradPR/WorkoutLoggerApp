<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: POST, OPTIONS");

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "OPTIONS"){
        include "../../config/connection.php";
        include "bodyweight-functions.php";
        
        try{

            $data = file_get_contents("php://input");
            $data = json_decode($data);

            $userId = intval($data->userId);
            $bw = floatval($data->bodyweight);
            $bf = floatval($data->bodyfat);
            $currentDate = date('Y-m-d H:i:s', time());


            $response = [];
            
            $insert = insertBodyweight($userId, $bw, $bf, $currentDate);
            
            if($insert){
                http_response_code(201);
                $response = ["message" => "Successfully added weight"];
                echo json_encode($response);
            }
            else{
                http_response_code(200);
                $response = ["message" => "Unsuccessfully added weight, error occured"];
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