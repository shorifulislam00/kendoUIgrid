<?php
	// get data
	$params = json_decode(file_get_contents("php://input"),true);
	extract($params);

	// get database connection
	$con = new mysqli("localhost","root","","angularjs_practice");
	$delete = $con->query("DELETE FROM institute_info WHERE id = '$id'");

	if($delete){
		$status = "success";
		$message = "Data successfully Deleted";
	}else{
		$status = "fail";
		$message = "Fail to delete data.Try again.";
	}

	echo json_encode(['status'=>$status,'message'=>$message,'data'=>'']);

?>