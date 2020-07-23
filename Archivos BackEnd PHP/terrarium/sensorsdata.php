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




      
$stmt = $pdo->prepare("SELECT  * FROM sensor WHERE idterrarium=1");
             
            $stmt->execute();


               $data[]  = $stmt->fetch(PDO::FETCH_OBJ);
    $humidity=implode('',array_column($data,'humidity'));
    $humidity=(float)$humidity;

    $temperature=implode('',array_column($data,'temperature'));
    $temperature=(float)$temperature;

    $soilmoisture=implode('',array_column($data,'soilmoisture'));
    $soilmoisture=(float)$soilmoisture;
      
    $data= [
      'soilmoisture' => $soilmoisture,
      'humidity' => $humidity,
      'temperature' => $temperature,

    
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
 