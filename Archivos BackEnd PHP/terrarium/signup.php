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

$stmt = $pdo->prepare("SELECT COUNT(id) as validar FROM users WHERE email=:email");
             $stmt->bindParam(':email', $_POST['email']);
            $stmt->execute();


               $rowexist[]  = $stmt->fetch(PDO::FETCH_OBJ);
    $validar=implode('',array_column($rowexist,'validar'));
    $validar=(float)$validar;
    
    if($validar>0){
        
 $data= ['status' => "exist",];
  $arr = array($data);
echo json_encode($arr);



}else{

$stmt = $pdo->prepare("INSERT INTO users (id, name,lastname, email, pass) VALUES (null,:name,:lastname,:email,:pass)");
             $stmt->bindParam(':name',$_POST['name']);
             $stmt->bindParam(':lastname',$_POST['lastname']);
               $stmt->bindParam(':email',$_POST['email']);
                 $stmt->bindParam(':pass',$_POST['pass']);
            $stmt->execute();
              $data= ['status' => "ok",];
  $arr = array($data);
echo json_encode($arr);

}

   
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }
 }else{
  echo json_encode("error");
}
 ?>