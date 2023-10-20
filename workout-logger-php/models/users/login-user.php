<?php
    include "../../config/header-access-control.php";
    header("Access-Control-Allow-Methods: POST, OPTIONS");

    header('Content-type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
        include "../../config/connection.php";
        include "user-functions.php";
        
        try{
            $data = file_get_contents("php://input");
            $data = json_decode($data);

            if($data == null){
                echo json_encode(["message" => "Data doesn't exist in LocalStorage"]);
            }
            else{
                
                $username = $data->username;
                $password = $data->password;

                $errors = 0;
                $response = [];

                if($username == '' || ($username == '' && $password == '')){
                    $errors++;
                }

                if($errors != 0){
                    http_response_code(200);
                    $response = ["message" => "Error during data processing. There was $errors errors"];
                    echo json_encode($response);
                }
                else{
                    if($password != ''){
                        $newPass = sha1($password);
                        $active = 1;
                        $loginDate = date("Y-m-d H:i:s", time());
                        $user = getUser($username, $newPass);
                        if($user){
                            if($user->title == "Admin"){
                                $response = ["message" => "Welcome back admin!", "user" => $user];
                            }
                            if($user->title == "User"){
                                $response = ["message" => "Welcome back $user->username!", "user" => $user];
                            }
                            loggedUserUpdate($user->id_user, $active, $loginDate);
                            http_response_code(200);
                        }
                        else{
                            http_response_code(200);
                            $response = ["message" => "Account doesn't exists!"];
                        }
                    }
                    else{
                        $user = getUserByUsername($username);
                        if($user){
                            http_response_code(200);
                            $response = ["message" => "Successfully got user for LocalStorage", "user" => $user[0], "bf" => $user[1], "wCount" => $user[2]];
                        }
                    }
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