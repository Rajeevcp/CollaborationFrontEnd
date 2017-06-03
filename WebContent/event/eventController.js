'use strict';

app.controller('eventController', [
	    'UserService',
		'$scope',
		'eventService',
		'$location',
		'$rootScope',
		'$cookieStore',
		'$window',
		'$http',
		'$routeParams',
		'$filter',
		function(UserService,$scope, eventService, $location, $rootScope, $cookieStore,
				$window, $http, $routeParams, $filter) {
			
			$scope.event = {
					id : '',
					name : '',
					event_date : '',
					venue : '',
					description : '',
					file_data : '',
					file_name : '',
					errorCode : '',
					errorMessage : '',
				};
			
			$scope.user = {
					id : '',
					name : '',
					password : '',
					mobile : '',
					address : '',
					email : '',
					isOnline : '',
					role : '',
					errorCode : '',
					errorMessage : '',
					image : ''
				};
			
			$scope.files = {};
			$scope.events = [];
			
			
			$scope.getAllEvents = function() {

				console.log("fetchAllEvent...")
				eventService.fetchAllevent().then(function(d,status,headers,config) {
					$scope.events = d;
					$scope.img = d.file_data;
					
			
			            
			            
			            
				}, function(errResponse) {
					console.error('Error while fetching Blogs');
				});

			};

			$scope.getAllEvent = function() {

				$scope.getAllEvents();
			}

			
			$scope.saveEvent = function(event) {
				
				console.log("Event created with name ")
			    
				
				
			
				console.log('File name is ')
				eventService.saveEvent(event).then(function(d) {
					
					alert("Event Creates Successfully")
				}, function(errResponse) {
					console.error('Error while create Event.');
				});
			};
		
			$scope.event_create = function(){
				
				
				$scope.saveEvent($scope.event)
				
			}
			
	$scope.upload_image = function(imgfiles) {
		var formData=new FormData();
		formData.append("file",imgfiles);
		console.log('sending to service')
		console.dir(formData);
				eventService.saveImage(formData).then(function(d) {
					
					alert("Event Creates Successfully")
				}, function(errResponse) {
					console.error('Error while create Event.');
				});
			};
			
		$scope.event_image = function(){
			var txt = $scope.files;
			
		    $scope.upload_image($scope.files)
		//	console.log()
		}
			
		
		$scope.uploadFile = function(files) {
			console.log("user service started")
			var BASE_URL = 'http://localhost:8083/CollaborationRestService'
		    var image = new FormData();
			console.log(files[0])
		    //Take the first selected file
		    image.append("file", files[0]);

		    $http.post(BASE_URL+'/imageUpload', image, {
		        withCredentials: true,
		        headers: {'Content-Type': undefined },
		        transformRequest: angular.identity
		    }).success(function(data, status, headers, config) {
				alert("success")
				 $scope.reloadPage = function()                                                
	                   {
	                     $window.location.reload();
	                   }
				console.log(image)
			}).error(function(data, status, headers, config) {
				alert("error")
			});

		};
		
		$(function() {
			   console.log("edit")
			    $('#profile-image1').on('click', function() {
			        $('#profile-image-upload').click();
			    });
			}); 
		
		
		$scope.myProfile = function() {
			console.log("myProfile...")
			UserService
					.myProfile()
					.then(
							function(d) {
								$scope.user = d;
							
								
								$location
										.path("/my_profiles")
							},
							function(errResponse) {
								console
										.error('Error while fetch profile.');
							});
		};

		
		$scope.uploadFile = function(files) {
			var BASE_URL='http://localhost:8083/CollaborationRestService'
		    var image = new FormData();
		    //Take the first selected file
		    image.append("file", files[0]);

		    $http.post(BASE_URL+'/imageUpload', image, {
		        withCredentials: true,
		        headers: {'Content-Type': undefined },
		        transformRequest: angular.identity
		    }).success(function(data, status, headers, config) {
				alert("success")
				 $scope.reloadPage = function()                                                
	                   {
	                     $window.location.reload();
	                   }
				$scope.myProfile();
				console.log(image)
			}).error(function(data, status, headers, config) {
				alert("error")
			});

		};
		
		   $(function() {
			   console.log("edit")
			    $('#profile-image1').on('click', function() {
			        $('#profile-image-upload').click();
			    });
			});    

		   
		   $scope.getEventById = function(id) {

				console.log("Get Event..." + id)
				eventService.getEventByID(id).then(function(d) {
					$scope.event = d;
					$scope.event.event_date = new Date($scope.event.event_date);
					alert($scope.event.event_date);

				}, function(errResponse) {
					console.error('Error while fetching Event');
				});

			};

			$scope.eventEdit = function(id) {
				console.log('Get  Event By Id ' + id);
				$scope.getEventById(id);
			}
			
			$scope.updateEvent = function(){
				eventService.updateEvent($scope.event).then(function(d) {
					$scope.event = {};
					$scope.getAllEvents()
					$location.path("/event-manage")
				},
				function(errResponse){
					console.error('Error while updating Event')
					
				});
				
			};
			$scope.event_update = function(){
				console.log('Updating Event started '+$scope.event.id)
				$scope.updateEvent($scope.event)
			}
			
		} ]);