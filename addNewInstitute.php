<?php
	$params = json_decode(file_get_contents("php://input"),true);

	extract($params);

	$con = new mysqli("localhost","root","","angularjs_practice");
	
	if(isset($name) && isset($address) && isset($phone) && isset($fax) && isset($mobile) && isset($email) && isset($web_addr)){
		$ins = $con->query("INSERT INTO institute_info(id,name,address,phone,fax,mobile,email,web_addr) VALUES('','$name','$address','$phone','$fax','$mobile','$email','$web_addr')");

		$params['id'] = $con->insert_id;

		if($ins){
			$status = "success";
			$msg = "New Information successfully added";
		}else{
			$status = "fail";
			$msg = "Fail to add new information.Try again";
		}
	}
	else{
		$status = 'fail';
		$msg = "Something wrong.Field are empty.";
	}


	echo json_encode(['status'=>$status,'message'=>$msg,'data'=>$params]);

?>