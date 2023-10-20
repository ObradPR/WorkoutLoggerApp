<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: POST, OPTIONS");

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "OPTIONS"){
        include "../../config/connection.php";
        include "measurement-functions.php";
        
        try{

            $data = file_get_contents("php://input");
            $data = json_decode($data);

            $userId = intval($data->userId);
            $neck = $data->addNeck;
            $chest = $data->addChest;
            $rArm = $data->addRightArm;
            $lArm = $data->addLeftArm;
            $rForearm = $data->addRightForearm;
            $lForearm = $data->addLeftForearm;
            $waist = $data->addWaist;
            $rLeg = $data->addRightLeg;
            $lLeg = $data->addLeftLeg;
            $rCalf = $data->addRightCalf;
            $lCalf = $data->addLeftCalf;
            $currentDate = date('Y-m-d H:i:s', time());


            $response = [];
            
            $insert = insertMeasurement($userId,$chest, $neck, $rArm, $lArm, $rForearm, $lForearm, $waist, $rLeg, $lLeg, $rCalf, $lCalf, $currentDate);
            
            if($insert){
                http_response_code(201);
                $response = ["message" => "Successfully logged"];
                echo json_encode($response);
            }
            else{
                http_response_code(200);
                $response = ["message" => "Unsuccessfully logged, error occured"];
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