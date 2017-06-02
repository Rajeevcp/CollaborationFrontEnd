'use strict';

app.controller('friendController', [
		'UserService',
		'$scope',
		'friendService',
		'$location',
		'$rootScope',
		'$http',
		'$routeParams',
		'$interval',
		'$filter',
		'$timeout',
		function(UserService, $scope, friendService, $location, $rootScope,
				$http, $routeParams,$interval, $filter,$timeout) {
			console.log("FriendController...")

			var self = this;
			$scope.friend = {
				id : '',
				user_id : '',
				friend_id : '',
				status : ''
			};
			$scope.friends = [];

			$scope.user = {
				id : '',
				name : '',
				password : '',
				mobile : '',
				address : '',
				email : '',
				is_online : '',
				role : '',
				errorMessage : ''
			};
			$scope.friendRequest = {
				id : '',
				name : '',
				password : '',
				mobile : '',
				address : '',
				email : '',
				is_online : '',
				role : '',
				errorMessage : '',
				errorCode : ''
			};
	$scope.message = {};
	$scope.sendMessage = {
			
			user_id : '',
			friend_id : '',
			date_time : '',
			message : ''
			
	}
			$scope.myfriends = [];
			$scope.users = [];
			 var param1 = $routeParams.param1;
			$scope.requestedFriends = [];

			$scope.fetchAllUsers = function() {
				UserService.fetchAllUsers().then(function(d) {
					$scope.users = d;
				}, function(errResponse) {
					console.error('Error while fetching Users');
				});
			};

			$scope.fetchAllUsers();

			$scope.sendFriendRequest = function(id) {
				friendService.sendRequest(id).then(function(d) {
					$scope.friendRequest = d;
					if ($scope.friendRequest.errorCode == '200') {
						alert($scope.friendRequest.errorMessage)
					}

				}, function(errResponse) {

				});

			};
			$scope.sendRequest = function(id) {
				console.log("friend id is " + id)
				$scope.sendFriendRequest(id)
			}

			/*
			 * $scope.duplicateRequest = function(friend_id){ var items =
			 * ['rajeev','Niit']; console.log("Friend Id "+friend_id+ "and User
			 * ID ") return $filter('filter')(items, friend_id).length > 0;;;
			 * //$scope.checkRequested(friend_id,id) }
			 */
			$scope.getMyFriendRequests = function() {
				friendService.getMyFriendRequests().then(function(d) {
					$scope.friends = {
						text : d
					};
					$scope.requestedFriends = [];
					// $rootScope.requestedFriends = d;
					angular.forEach(d, function(value, key) {
						// console.log('key:', key);
						 console.log('value:', value);
						$scope.requestedFriends.push(value);
					});

				}, function(errResponse) {
					console.error('Error while updating Friend.');
				});
			};

			$scope.getMyfriendsreq = function() {
				$scope.getMyFriendRequests()
			}
			$scope.show = function(val) {
				var items = $scope.requestedFriends;
				// console.log(items)
				// console.log(val)
				// console.log('azx '+$filter('filter')(items, val).length)
				var t = items.indexOf(val);
				// console.log('id ' + val + ' and t is ' + t)
				if (items.indexOf(val) != -1) {
					return 'cc';

				} else {
					return 'xx'
				}

				/*
				 * console.log('request length '+val+ 'is'+t) return
				 * $filter('filter')(items, val).length >= 1; ; ;
				 */
				// $location.path("/job")
			}

			$scope.getMyFriends = function() {
				console.log("Getting my friends")
				friendService.getMyFriends().then(function(d) {
					if (d.errorCode != '404') {

						$scope.myfriends = d;
						// console.log("Got the friends list" +
						// $rootScope.myfriends)
					} else {
						$scope.myfriends = [ 'unknown' ];
					}
					// $location.path('/view_friend');
				}, function(errResponse) {
					console.error('Error while fetching Friends');
				});
			};

			$scope.showFriend = function() {
				console.log('function show friend called')
				$scope.getMyFriends()
			}

			$scope.showFriends = function(val) {
				var items = $scope.myfriends;
				// console.log(items)
				// console.log('azx '+$filter('filter')(items, val).length)

				var tt = items.indexOf(val);
				// console.log('id ' + val + ' and t is ' + tt)
				if (items.indexOf(val) != -1) {
					return 'aa'

				} else {
					return 'bb';
				}
				// $location.path("/job")
			}

			$scope.acceptFriendRequest = function(id) {
				console.log("Getting my friends")
				friendService.acceptFriendRequests(id).then(function(d) {
					console.log(d.friend_id)
					console.log("success response")
					$scope.getMyFriendRequests();
					$scope.show(d.user_id)
					$scope.getMyFriends()
					$scope.showFriends(d.user_id)
					$location.path("/users")

					// $location.path("/job")
					// $location.path('/view_friend');
				}, function(errResponse) {
					console.error('Error while fetching Friends');
				});
			};

			$scope.acceptRequest = function(id) {
				$scope.acceptFriendRequest(id)
			}
			
			$scope.unFriend = function(id){
	              friendService.unFriend(id)
	                      .then(function(d) {
	                    	  $scope.getMyFriends()
	      					$scope.showFriends(d.user_id)
	      					}, 
	                              function(errResponse){
	                                   console.error('Error while unFriend ');
	                              } 
	                  );
	          };
	          
	          $scope.unfriend = function(id) {
	        	  console.log("calling")
					$scope.unFriend(id)
				}
	          
	          $scope.rejectFriendRequest = function(id){
	              friendService.rejectFriendRequest(id)
	                      .then(function(d) {
	                    	$scope.getMyFriendRequests();
	      					$scope.show(d.user_id)
	      					$scope.getMyFriends()
	      					$scope.showFriends(d.user_id)
	                      },
	                    		  $scope.fetchAllFriends, 
	                              function(errResponse){
	                                   console.error('Error while rejectFriendRequest');
	                              } 
	                  );
	          };
	          
	          $scope.rejectfriendRequest = function(id){
	        	  console.log("Rejection Started")
	        	  $scope.rejectFriendRequest(id) 
	          }
	          
	          $scope.loadMessage = function(id) {
	        	  console.log("Start friend id chat "+id)
					friendService.getFriendMessage(id).then(function(d) {
						$scope.message = d;
						
						console.log(JSON.stringify($scope.message))
					}, function(errResponse) {

					});

				};
	          
	          $scope.load_message = function(){
	        	  
	        	  $scope.loadMessage(param1)
	          }
	          
	          
	          $scope.sendingmsg = function($data) {
	        	  console.log("sending msgs to "+$data.friend_id)
	        	  
	        		friendService.sendMessage($data).then(function(d) {
	        			console.log(JSON.stringify(d))
	        			$scope.intervalFunction();
						//alert("Success")
	        			$scope.sendMessage = {};
						//console.log(JSON.stringify($scope.message))
					}, function(errResponse) {

					});
					

				};
	          
	          $scope.addChat = function() {
	        	  console.log("Message Sending started")
	        	  console.log("Sending to "+param1)
	        	  $scope.sendMessage.friend_id = param1;
	        	  $scope.sendMessage.message = $scope.newChatMsg;
	        	  console.log("msg is "+$scope.sendMessage.newChatMsg)
	        	  $scope.sendingmsg($scope.sendMessage)
	        	  
	        	  
	          }
	        
	         
	          
	          
	          $scope.intervalFunction = function(){
	        	    $timeout(function() {
	        	    	$scope.loadMessage(param1)
	        	     
	        	    }, 1000)
	        	  };

	        	  // Kick off the interval
	        	  

	        	
	        /*  $interval(callAtInterval, 1000);
	          
	          function callAtInterval() {
	        	  if(param1){
	        		  if($rootScope.currentUser.id == 'rajeev') {
	        		 // $scope.loadMessage($rootScope.currentUser.id)
	        		  console.log($scope.sendMessage.friend_id);
	        	    console.log($rootScope.currentUser.id);
	        		  }
	        	  }
	          }*/
	            
		} ]);
