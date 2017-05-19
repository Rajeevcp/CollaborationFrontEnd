'use strict';

app.controller('friendController', [
		'UserService',
		'$scope',
		'friendService',
		'$location',
		'$rootScope',
		'$http',
		'$routeParams',
		'$filter',
		function(UserService, $scope, friendService, $location, $rootScope,
				$http, $routeParams, $filter) {
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
			$scope.myfriends = [];
			$scope.users = [];

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
						// console.log('value:', value);
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
		} ]);
