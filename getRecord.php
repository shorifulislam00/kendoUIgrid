<?php
header('Content-Type: application/json');
	$con = new mysqli('localhost','root','','angularjs_practice');
	$query = $con->query("SELECT * FROM institute_info");
	$total = $query->num_rows;

	// initial result value
	$instituteInfo = [];

	while($rows = $query->fetch_assoc()){
		$instituteInfo[] = $rows;
 	}

 	echo json_encode(['status'=>'success','message'=>'data found','data'=>$instituteInfo,'total'=>$total]);

?>