var app = angular.module("myApp",["kendo.directives"]);
app.controller("myCtrl",function($scope,$http){

	// initialize data
	$scope.newHeaderTxt = false;
	$scope.updateHeaderTxt = false;

	// get institution information
	$http.get('getRecord.php').then(function(response){
		$scope.instituteInfo = response.data.data;
		$scope.total = response.data.total;
	});

	// form reset function
	$scope.itemReset = function(){
		$scope.updateHeaderTxt = false;
		$scope.addHeaderTxt = true;

		$scope.editIndex = '';
		$scope.editId = '';
		$scope.editName = '';
		$scope.editAddr = '';
		$scope.editPhone = '';
		$scope.editFax = '';
		$scope.editMobile = '';
		$scope.editEmail = '';
		$scope.editWebLink = '';
	};

	// edit modal open
	$scope.editInfo = function(ins_id,index){

		$scope.updateHeaderTxt = true;
		$scope.addHeaderTxt = false;

		$scope.editIndex = index;
		$scope.editId = ins_id;
		$scope.editName = $scope.instituteInfo[index].name;
		$scope.editAddr = $scope.instituteInfo[index].address;
		$scope.editPhone = $scope.instituteInfo[index].phone;
		$scope.editFax = $scope.instituteInfo[index].fax;
		$scope.editMobile = $scope.instituteInfo[index].mobile;
		$scope.editEmail = $scope.instituteInfo[index].email;
		$scope.editWebLink = $scope.instituteInfo[index].web_addr;
	};

	// update function
	$scope.updateInfo = function(){
		var data = {
			'id':$scope.editId,
			'name':$scope.editName,
			'address':$scope.editAddr,
			'phone':$scope.editPhone,
			'fax':$scope.editFax,
			'mobile':$scope.editMobile,
			'email':$scope.editEmail,
			'web':$scope.editWebLink
		};

		$http.post('updateInfo.php',data).then(function(response){
			$scope.updateMsg = response.data.message;
			if(response.data.status == 'success'){
				$("#myEdit").modal('toggle');
				
				// update information
				$scope.instituteInfo[$scope.editIndex].name = $scope.editName;
				$scope.instituteInfo[$scope.editIndex].address = $scope.editAddr;
				$scope.instituteInfo[$scope.editIndex].phone = $scope.editPhone;
				$scope.instituteInfo[$scope.editIndex].fax = $scope.editFax;
				$scope.instituteInfo[$scope.editIndex].mobile = $scope.editMobile;
				$scope.instituteInfo[$scope.editIndex].email = $scope.editEmail;
				$scope.instituteInfo[$scope.editIndex].web_addr = $scope.editWebLink;

			}
		});

	};

	// add new information option
	$scope.addNewInfo = function(){
		var data = {
			'name':$scope.editName,
			'address':$scope.editAddr,
			'phone':$scope.editPhone,
			'fax':$scope.editFax,
			'mobile':$scope.editMobile,
			'email':$scope.editEmail,
			'web_addr':$scope.editWebLink
		};

		console.log(data);

		$http.post('addNewInstitute.php',data).then(function(response){
			$("#myEdit").modal('toggle');
			$scope.updateMsg = response.data.message;
			
			if(response.data.status == 'success'){
				$scope.instituteInfo.push(response.data.data);
				$scope.total++;
			}
			console.log(response);
		});

	};

		// delete option
		$scope.deleteInfo = function(ins_id,index){
			var data = {
				'id':ins_id
			};

			$http.post('deleteInfo.php',data).then(function(response){
				$scope.updateMsg = response.data.message;
				console.log(response);
				if(response.data.status == 'success'){
					$scope.total--;
					$scope.instituteInfo.splice(index,1);
				}
			});
		};

});