<?php
    function getGenders(){
        global $conn;

        $qry = "SELECT * FROM genders";

        $data = $conn->query($qry)->fetchAll();

        return $data;
    }
?>