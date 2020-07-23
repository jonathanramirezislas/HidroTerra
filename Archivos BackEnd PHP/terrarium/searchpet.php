<?php
 
 header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
  

   require('library.php');
 $data = array();

 $postdata = file_get_contents("php://input");// leer la petcicion post
try {
	    $sql  = "SELECT * FROM pets WHERE name  LIKE '%".$_POST['pet']."%' ";
            $stmt= $pdo->prepare($sql);
            $stmt->execute();
         
            
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
    {
         $data[] = $row;
    }
      echo json_encode($data);// Return data as JSON
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }
 ?>
