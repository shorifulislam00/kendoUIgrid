<?php
	$params = json_decode(file_get_contents('php://input'),true);
	extract($params);

	$con = new mysqli("localhost","root","","angularjs_practice");

	$update = $con->query("UPDATE institute_info SET name = '$name',address = '$address',phone = '$phone',fax = '$fax',mobile = '$mobile',email = '$email',web_addr = '$web' WHERE id = '$id' ");

	if($update){
		$msg = "Data successfully modify";
		$status = "success";
	}else{
		$msg = "Data modification fail";
		$status = "fail";
	}


	echo json_encode(['status'=>$status,'message'=>$msg,'data'=>'']);

?>