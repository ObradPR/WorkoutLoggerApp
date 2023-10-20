<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: GET");

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "GET"){
        include "../../config/connection.php";
        include "goal-functions.php";
        
        try{
            $types = getGoalTypes();

            if($types){
                $response = ["goalTypes" => $types];
                http_response_code(200);
            }
            else{
                $response = ["message" => "There was an error while getting goal types from the database, try again."];
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