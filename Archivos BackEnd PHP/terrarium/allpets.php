<?php
   header('Access-Control-Allow-Origin: *');
   require('library.php');
 $data = array();
try {
	    $sql  = "SELECT * FROM pets ORDER BY name";
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