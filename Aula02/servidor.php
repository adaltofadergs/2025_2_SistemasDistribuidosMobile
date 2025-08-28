<?php
    $numero = $_GET["valor"];
    $txt = "";
    for( $i = 1; $i <= $numero ; $i++ ){
        $txt .= $i . "<br>";
        sleep(1);
    }
    
    echo $txt;
