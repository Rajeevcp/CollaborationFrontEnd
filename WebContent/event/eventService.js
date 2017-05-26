'use strict';

app.service('eventService', [
		'$http',
		'$q',
		'$rootScope',
		function($http, $q, $rootScope) {

			console.log("Event Service...")

			var BASE_URL = 'http://localhost:8083/CollaborationRestService'

			return {
				
				saveEvent : function(event) {
					console.log("calling create event ccc ")
					return $http.post(BASE_URL + '/event/create',event) // 1
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while creating event');
						return $q.reject(errResponse);
					});
	
				},
				
				saveImage : function(files) {
					console.log("reached service ")
				
			
					
					return $http({
				        method: 'POST',
				        url: BASE_URL + '/duUpload',
				        headers: {'Content-Type': undefined},
				        data: files,
				        transformRequest: angular.identity
				        })
				       .success(function(data, status) {
				             alert("success");
				        });
					
										
	
				},
				fetchAllevent : function() {
					console.log("calling fetchAllEvent ")
					return $http.get(BASE_URL + '/events').then(
							function(response) {
								return response.data;
							}, null);
				},	
				
			}
		} ]);



