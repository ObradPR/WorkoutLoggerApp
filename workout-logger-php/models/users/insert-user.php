<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: POST, OPTIONS");

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "OPTIONS"){
        include "../../config/connection.php";
        include "user-functions.php";
        global $conn;

        $conn->beginTransaction();
        
        try{

            $data = file_get_contents("php://input");
            $data = json_decode($data);

            $username = $data->username;
            $password = $data->password;
            $email = $data->email;
            $dateOfBirth = $data->dateOfBirth;
            $day = $dateOfBirth->day;
            $month = $dateOfBirth->month;
            $year = $dateOfBirth->year;
            $height = $data->height;
            $weight = $data->weight;
            $gender = $data->gender;
            $notification = $data->notification;


            $emailRegex = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/';
            $passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?])(?=.*[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]).{8,}$/';
            $numberRegex = '/^[1-9][0-9]{1,2}(\.[1-9])?$/';

            $errors = 0;
            $response = [];

            if(!preg_match($emailRegex, $email)){
                $errors++;
            }
            
            if(!preg_match($passwordRegex, $password)){
                $errors++;
            }
            if(!preg_match($numberRegex, $weight)){
                $errors++;
            }
            if(!preg_match($numberRegex, $height)){
                $errors++;
            }
            if(!checkInDatabase('username', $username)){
                $errors++;
            }
            if(!checkInDatabase('email', $email)){
                $errors++;
            }
                        
            if($errors != 0){
                // Error are returning 200 because Cors policy cannot have status different than 2xx
                http_response_code(200);
                $response = ["message" => "Error during data processing. There was $errors errors"];
                echo json_encode($response);
            }
            else{
                $newPassword = sha1($password);
                $role = 2;
                $active = 0;
                $regDate = date('Y-m-d H:i:s', time());
                $birthDate = "$year-$month-$day";
                
                $insert = insertUser($username, $email, $newPassword, $birthDate, $height, $weight, $notification, $active, $regDate, $gender, $role);
                
                if($insert){
                    $userId = $conn->lastInsertId();
                    $bodyfat = 0;

                    $insert2 = insertBodyweight($userId, $regDate, $weight, $bodyfat);

                    if($insert2){
                        $conn->commit();
                        http_response_code(201);
                        $response = ["message" => "Successfully created account", "data" => ['user'=>$username]];
                        echo json_encode($response);
                    }
                    else{
                        http_response_code(200);
                        $response = ["message" => "Unsuccessfully created account, error occured"];
                        echo json_encode($response);
                    }              
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