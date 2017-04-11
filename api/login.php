<?php 
	include_once 'includes/connection.php';
	include_once 'includes/function.php';
	$data = array();
	$response = array();
	if ( isset($_POST['rollno']) )
	{
		$query = "SELECT * FROM users WHERE rollno = '{$_POST['rollno']}' ";
		$users = mysql_query($query);
		confirm_query($users, "Getting users ");

		if (mysql_num_rows($users) > 0){	
			while ($user = mysql_fetch_array($users) ){
			 //$token = $user['token'];
			 $name= $user['Name'];
			}					
			$status = 1;
			$message = 'OK';	
			$data = array('name' => $name);
		}else {
			$status = 2;
			$message = "User doesn't exist ";
		}
	} else {
		$status = 3;
		$message = 'Rollno. is required..';
	}
	$response = array('status' => $status ,'message' => $message, 'data' => $data);
	echo json_encode($response);
?>