var app = angular.module("LoginApp", [])

app.controller("LoginController",[ "$scope","LoginService" , function($scope,LoginService) {
	
	
	$scope.user = {"id" : "", 
			"name" : "",
			"password" : "",
			"role": "",
			"address" : "",
			"mobile" : "",
			"errorCode": "",
			"errorMessage":""
	
	
	}
	
	
	console.log("Starting of the LoginController")
	$scope.validate = function()
	{
		$scope.user = LoginService.validateCredentials($scope.user)
		
		
		
		if($scope.user.errorCode==200)
			{
			
			$scope.message="Welcome , " + $scope.user.name
			}
		else
			{
			$scope.message=$scope.user.errorMessage
			}
		
	}
	
} ])
