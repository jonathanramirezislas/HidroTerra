<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
   


   require('library.php');




$stacksoilmoisture= [];
$stackhumidity= [];
$stacktemperature= [];





$stmt = $pdo->prepare("SELECT * FROM sensor_record WHERE idterrarium=1 ORDER BY date DESC");
            $stmt->execute();
            
            
           
          while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
              $date = new DateTime($fila["date"]);

     array_push($stacksoilmoisture,["x"=>$date->format('Y-m-d'),"y"=> (float)$fila["humidity"]]);
  
   array_push($stackhumidity,["x"=>$date->format('Y-m-d'),"y"=> (float)$fila["soilmoisture"]]);
  
    array_push($stacktemperature,["x"=>$date->format('Y-m-d'),"y"=> (float)$fila["temperature"]]);
  
 
}
 
  
        
        
        
    
   $someArray = 
    [ 
        [
      "seriesName"   => "Humidity",
      "data" => (array)$stackhumidity,
      "color"=> "#0000FF"
      ],
      [
      "seriesName"=> "Soil Moisture",
      "data" => 
      (array)$stacksoilmoisture,
      "color"=> "#04B404"
      ],
      [
       "seriesName"=> "Temperature",
      "data" => (array)$stacktemperature,
      "color"=> "#FFBF00"
      ]
      
    ];


  // Convert Array to JSON String
  $someJSON = json_encode($someArray);
  echo $someJSON;




?>