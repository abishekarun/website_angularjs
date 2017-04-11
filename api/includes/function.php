<?php
 function confirm_query($query_result, $message){
	if (!$query_result){
		die("Database ". $message . " Failed. " . mysql_error());
	}
	
}
?>
