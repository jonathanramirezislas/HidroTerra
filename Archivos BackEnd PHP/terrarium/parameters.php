<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
   


   require('library.php');
 $data = array();

 $postdata = file_get_contents("php://input");// leer la petcicion post
if (isset($postdata)){
$request = json_decode($postdata);// decodificar el array post


try {




      
$stmt = $pdo->prepare("SELECT  * FROM parameters WHERE idterrarium=1");
             
            $stmt->execute();





            
    $data[]  = $stmt->fetch(PDO::FETCH_OBJ);
    
    $minTemp=implode('',array_column($data,'minTemp'));
    $minTemp=(float)$minTemp;
    $maxTemp=implode('',array_column($data,'maxTemp'));
    $maxTemp=(float)$maxTemp;

    $minHumidity=implode('',array_column($data,'minHumidity'));
    $minHumidity=(float)$minHumidity;
    $maxHumidity=implode('',array_column($data,'maxHumidity'));
    $maxHumidity=(float)$maxHumidity;

    $minSoilMoisture=implode('',array_column($data,'minSoilMoisture'));
    $minSoilMoisture=(float)$minSoilMoisture;
    $maxSoilMoisture=implode('',array_column($data,'maxSoilMoisture'));
    $maxSoilMoisture=(float)$maxSoilMoisture;
      
    $data= [
         'tempMinValue'=>$minTemp,
      'tempMaxValue'=>$maxTemp,
      'humidityMinValue'=>$minHumidity,
      'humidityMaxValue'=>$maxHumidity,
      'soilMoistureMinValue'=>$minSoilMoisture,
      'soilMoistureMaxValue'=>$maxSoilMoisture

      
  ];
  $arr = array($data);

echo json_encode($arr);






   
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }
 }else{
  echo json_encode("error");
}
 ?>
 