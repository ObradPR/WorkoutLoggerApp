<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "OPTIONS"){
        include "../../config/connection.php";
        include "user-functions.php";
        
        try{

            $data = file_get_contents("php://input");
            $data = json_decode($data);

            $email = $data->email;
            $title = $data->title;
            $description = $data->description;

            $errors = 0;
            $response = [];

            if($email == ''){
                $errors++;
            }
            
            if($title == ''){
                $errors++;
            }
            if($description == ''){
                $errors++;
            }
                        
            if($errors != 0){
                http_response_code(200);
                $response = ["message" => "Error during data processing. There was $errors errors"];
                echo json_encode($response);
            }
            else{
                $sentDate = date('Y-m-d H:i:s', time());
                
                $send = sendContact($email, $title, $description, $sentDate);
                
                if($send){
                    http_response_code(201);
                    $response = ["message" => "Successfully sent message"];
                    echo json_encode($response);
                }
                else{
                    http_response_code(200);
                    $response = ["message" => "Unsuccessfully sent message, error occured"];
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