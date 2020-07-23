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



if($_POST['option']=='components'){
     
    $stmt = $pdo->prepare("UPDATE parameters SET minTemp=:tempMinValue,maxTemp=:tempMaxValue,minHumidity=:humidityMinValue,maxHumidity=:humidityMaxValue,minSoilMoisture=:soilMoistureMinValue,maxSoilMoisture=:soilMoistureMaxValue WHERE idterrarium=1");
    
    
             $stmt->bindParam(':tempMinValue',$_POST['tempMinValue']);
             $stmt->bindParam(':tempMaxValue',$_POST['tempMaxValue']);
             $stmt->bindParam(':humidityMinValue',$_POST['humidityMinValue']);
             $stmt->bindParam(':humidityMaxValue',$_POST['humidityMaxValue']);
        $stmt->bindParam(':soilMoistureMinValue',$_POST['soilMoistureMinValue']);
       $stmt->bindParam(':soilMoistureMaxValue',$_POST['soilMoistureMaxValue']);
     
            $stmt->execute();
    
     $data= [
      'status' => 'ok'];
      $arr = array($data);

echo json_encode($data);


}


   
   } catch(PDOException $e)
   {
         $data= [
      'status' => 'error'];
   }
 }else{
   $data= [
      'status' => 'error'];
}
 ?>