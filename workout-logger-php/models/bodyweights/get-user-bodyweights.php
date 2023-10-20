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

            $userId = $data;
            
            $bodyweights = getUserBodyweights($userId);
            $userGoal = getUserGoal($userId);

            if($bodyweights){
                $response = ["bodyweights" => $bodyweights, "goal" => $userGoal];
                http_response_code(200);
            }
            else{
                $response = ["message" => "There are no weights logged."];
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