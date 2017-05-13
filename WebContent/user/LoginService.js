/**
 * http://localhost:8081/ColloborationRestServices/validate/{id}/{password}
 */

app.service("LoginService", ["$http",  function($http) {

	var BASE_URL ="http://localhost:8003/Sample"
	
		this.user = {"id" : "", 
			"name" : "",
			"password" : "",
			"role": "",
			"address" : "",
			"mobile" : "",
			"errorCode": "",
			"errorMessage":""
	
	
	}
	
	
	this.validateCredentials = function(user) {
		
		
	return	$http.post(BASE_URL+"/user/validate/",user)
		.then(
				
		      
		        	 function(response)
			         {
			        	 this.user= response.data

			        	  if(this.user.errorCode=="200")
			        	  {
			        	  	alert(this.user.errorMessage)
			        	  }
			        	  else
			        	  {
			        	  		alert("Error :" + this.user.errorMessage)
			        	  }
			        	 return this.user
			         }
		         
		
		
		)
		
		
		
		
	}
	
	
	
	
	
}]);




