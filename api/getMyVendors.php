<?php 

	include_once 'includes/connection.php';
	include_once 'includes/function.php';
	$status = 3;
	$message = 'invalid params';
	$data = array();
	$response = array();
	if (isset($_POST['pin']) ){
		$pin = $_POST['pin'];
		$query = "SELECT * FROM myVendors WHERE pin = '{$pin}'  ";
		$vendors = mysql_query($query);
		if (mysql_num_rows($vendors) > 0){
			
			while ($vendor = mysql_fetch_array($vendors)) {
				$vendorAr = array( 'vendor_id' => "{$vendor['vendor_id']}", 'name' => "{$vendor['name']}",'image' => "{$vendor['image']}");
				array_push($data, $vendorAr);
			}

			$status = 1;
			$message = 'OK';
		}else {
			$status = 2;
			$message = 'No Vendors available';
		}
		
	}
	$response = array('status' => $status ,'message' => $message, 'data' => $data);
	echo json_encode($response);
?>