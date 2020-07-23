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



if($_POST['option']=='spotlight'){
    
    $stmt = $pdo->prepare("UPDATE components SET spotlight=:value WHERE idterrarium=1");
             $stmt->bindParam(':value',$_POST['spotlightValue']);
            $stmt->execute();
    
     $data= [
      'status' => 'ok'];
      $arr = array($data);

echo json_encode($arr);


}


if($_POST['option']=='components'){
    
  if($_POST['humidifier']==0 & $_POST['pump']==0){
      
        $data= [
      'status' => 'error!'];
      $arr = array($data);

echo json_encode($arr);
  }else{
      
      
      $stmt = $pdo->prepare("UPDATE components SET pump=:pump,humidifier=:humidifier WHERE idterrarium=1");
             $stmt->bindParam(':pump',$_POST['pump']);
              $stmt->bindParam(':humidifier',$_POST['humidifier']);
            $stmt->execute();
    
    
    $data= [
      'status' => 'ok'];
      $arr = array($data);

echo json_encode($arr);
  }
    
    


}


   
   }
   catch(PDOException $e)
   {

    //  echo $e->getMessage();
   }
 }else{
  echo json_encode("error");
}
 ?>
 