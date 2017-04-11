<?php 

	include_once 'includes/connection.php';
	include_once 'includes/function.php';
	$status = 2;
	$message = 'invalid params';
	if ((isset($_POST['pin'])) && (isset($_POST['email'])) ){
		
		$status = 3;
		$query = "INSERT INTO emails ( email, pin)
		 		VALUES ('{$_POST['email']}', '{$_POST['pin']}' ) ";
		$addition = mysql_query($query);
		confirm_query($addition, "Insertion");
		$status = 1;
		$message = 'OK';
	}
	$data = array('status' => $status ,'message' => $message);
	echo json_encode($data);
?>