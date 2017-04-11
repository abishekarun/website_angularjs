<?php 

	include_once 'includes/connection.php';
	include_once 'includes/function.php';
	$status = 3;
	$message = 'invalid params';
	$data = array();
	$response = array();
	if (isset($_POST['vendor_id']) ){
		$vendor = $_POST['vendor_id'];
		if (isset($_POST['vendor_id']) && isset($_POST['sub_category']) ){
			$query = "SELECT * FROM items WHERE vendor_id = '{$vendor}'  AND sub_category = '{$_POST['sub_category']}' ";
		}else{
			$query = "SELECT * FROM items WHERE vendor_id = '{$vendor}'  ";		
		}
		$items = mysql_query($query);
		confirm_query($items, "Getting items ");
		if (mysql_num_rows($items) > 0){
			
			while ($item = mysql_fetch_array($items)) {
				$itemAr = array( 'item_id' => "{$item['id']}", 'vendor_id' => "{$item['vendor_id']}", 'name' => "{$item['name']}", 'price' => "{$item['price']}",'image' => "{$item['image']}",'quantity' => "{$item['quantity']}", 'quantity_type' => "{$item['quantity_type']}" ,'category' => "{$item['category']}", 'sub_category' => "{$item['sub_category']}", 'manufacture' => "{$item['manufacture']}" );
				//$to_return_array[i] = $arr;
				//i++;
				array_push($data, $itemAr);
			}

			$status = 1;
			$message = 'OK';
		}else {
			$status = 2;
			$message = 'No items available';
		}
		
	}
	$response = array('status' => $status ,'message' => $message, 'data' => $data);
	echo json_encode($response);
?>