<?php
    include_once "config.php";

    try{
        $conn = new PDO("mysql:host=$serverName;dbname=$databaseName;charset-utf8",$databaseUsername, $databasePassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    }
    catch(PDOException $ex){
        echo $ex->getMessage();
    }
?>