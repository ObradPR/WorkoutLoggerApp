<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: GET");

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "GET"){
        include "../../config/connection.php";
        include "exercise-functions.php";
        
        try{
            $data = getExercises();

            $exercises = $data[0];
            $muscleGroups = $data[1];
            $exercisesMG = $data[2];

            if($exercises){
                $response = ["exercises" => $exercises, "muscleGroups" => $muscleGroups, "exercisesMG" => $exercisesMG];
                http_response_code(200);
            }
            else{
                $response = ["message" => "There was an error while getting exercises from the database, try again."];
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