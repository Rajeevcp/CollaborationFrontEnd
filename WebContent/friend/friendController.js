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
			$rootScope.myfriends = [];
			$scope.users = [];

			$rootScope.requestedFriends = [];
			self.fetchAllUsers = function() {
				UserService.fetchAllUsers().then(function(d) {
					$scope.users = d;
				}, function(errResponse) {
					console.error('Error while fetching Users');
				});
			};

			self.fetchAllUsers();

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
					// $rootScope.requestedFriends = d;
					angular.forEach(d, function(value, key) {
						// console.log('key:', key);
						// console.log('value:', value);
						$rootScope.requestedFriends.push(value);
					});
					// alert($rootScope.requestedFriends)
					// $rootScope.requestFriends = d;

					// $location.path="/viewFriendRequest";

				}, function(errResponse) {
					console.error('Error while updating Friend.');
				});
			};

			$scope.getMyfriendsreq = function() {
				$scope.getMyFriendRequests()
			}
			$scope.show = function(val) {
				var items = $rootScope.requestedFriends;
				// console.log(items)
				// console.log('azx '+$filter('filter')(items, val).length)
				var t = items.indexOf(val);
				//console.log('id ' + val + ' and t is ' + t)
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

						$rootScope.myfriends = d;
						// console.log("Got the friends list" +
						// $rootScope.myfriends)
					} else {
						$rootScope.myfriends = [ 'unknown' ];
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
				var items = $rootScope.myfriends;
				// console.log(items)
				// console.log('azx '+$filter('filter')(items, val).length)

				var tt = items.indexOf(val);
				//console.log('id ' + val + ' and t is ' + tt)
				if (items.indexOf(val) != -1) {
					return 'aa'

				} else {
					return 'bb';
				}
				// $location.path("/job")
			}
		} ]);
