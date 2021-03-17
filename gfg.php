<?php

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $name = "gfg";

        $file_name = $name . '.json';

        $inp = file_get_contents($file_name);

        if($inp){

            $tempArray = json_decode($inp);
            array_push($tempArray, $_POST['mots']. " ");
            $jsonData = json_encode($tempArray);

            if(file_put_contents("$file_name", $jsonData))
            {
                echo $file_name .' file created';
            }
            else {
                echo 'There is some error';
            }
        }
    }

?>
