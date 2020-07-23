<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
   


   require('library.php');
 $data = array();

 $postdata = file_get_contents("php://input");// Read  post request 
 
if (isset($postdata)){
$request = json_decode($postdata);// decodificar el array post

try {





    
  

      $stmt = $pdo->prepare("INSERT INTO sensor_record (idterrarium, temperature, soilmoisture, humidity, date) VALUES (1,:temperature,:soilmoisture,:humidity, CURRENT_TIMESTAMP)");
             $stmt->bindParam(':temperature',$_POST['temperature']);
               $stmt->bindParam(':humidity',$_POST['humidity']);
                 $stmt->bindParam(':soilmoisture',$_POST['soilmoisture']);
            $stmt->execute();
    
    $data= [
      'status' => 'ok'];
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
 

