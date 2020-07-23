<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
   


   require('library.php');
 $data = array();

 $postdata = file_get_contents("php://input");// leer la petcicion post
if (isset($postdata)){
$request = json_decode($postdata);// decodificar el array post

$email=$_POST['email'];
$pass=$_POST['pass'];

//$password=sha1($password); 

try {

$data= [//array php de los valores a postear en laa bd
  
];





$stmt = $pdo->prepare("SELECT COUNT(id) as validar FROM users WHERE email=:email and pass=:pass");
             $stmt->bindParam(':email', $email);
              $stmt->bindParam(':pass', $pass);
            $stmt->execute();


               $rowvalidar[]  = $stmt->fetch(PDO::FETCH_OBJ);
    $validar=implode('',array_column($rowvalidar,'validar'));
    $validar=(float)$validar;


    if($validar==1){

      
$stmt = $pdo->prepare("SELECT  id as id_user FROM users WHERE email=:email and pass=:pass");
             $stmt->bindParam(':email', $email);
              $stmt->bindParam(':pass', $pass);
            $stmt->execute();


               $rowidusuario[]  = $stmt->fetch(PDO::FETCH_OBJ);
    $iduser=implode('',array_column($rowidusuario,'id_user'));
    $iduser=(float)$iduser;
      
    $data= [
      'iduser' => $iduser,
      'status' => "ok",
    
  ];
  $arr = array($data);
echo json_encode($arr);

    }else{
         $data= [
      'iduser' => $iduser,
      'status' => "error",
    
  ];
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
 