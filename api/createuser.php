<?php 
	include_once 'includes/connection.php';
	include_once 'includes/function.php';
	$data = array();
	$response = array();
	if ( (isset($_POST['phone_number']) ) &&  (isset($_POST['first_name']) ) && (isset($_POST['last_name']) )  &&  (isset($_POST['password']) ) && (isset($_POST['email']) ) &&  (isset($_POST['city']) ) && (isset($_POST['pin']) ) ){
		
		$query = "SELECT * FROM users WHERE phone_number = '{$_POST['phone_number']}' ";
		$users = mysql_query($query);
		confirm_query($users, "Getting users ");

		if (mysql_num_rows($users) > 0){						
			$status = 2;
			$message = 'User already exists';	
		}else {
			$token = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 20);
			$query = "INSERT INTO users ( pin, phone_number, first_name, last_name, password, email, city, token) VALUES 
			('{$_POST['pin']} ',  '{$_POST['phone_number']}', '{$_POST['first_name']}', '{$_POST['last_name']}' , '{$_POST['password']}', '{$_POST['email']}', '{$_POST['city']}', '$token'  )";
			$result = mysql_query($query);
			confirm_query($result, "Adding users");
			$status = 1;
			$message = 'OK';
			$data = array('token' => $token );
		}
		
	} else {
		$status = 3;
		$message = 'invalid params';
	}
	$response = array('status' => $status ,'message' => $message, 'data' => $data);
	echo json_encode($response);
?>