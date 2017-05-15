'use strict';

app.factory('friendService', [
		'$http',
		'$q',
		'$rootScope',
		function($http, $q, $rootScope) {

			console.log("FriendService...")

			var BASE_URL = 'http://localhost:8083/CollaborationRestService'
			return {

				sendRequest : function(id) {
					console.log('Enter into save friend ' + id)
					return $http.get(BASE_URL + '/addFriend/' + id).then(
							function(response) {
								if (response.data.errorCode == 404) {
									alert(response.data.errorMessage)
								}
								return response.data;
							}, function(errResponse) {
								console.error('Error while creating friend');
								return $q.reject(errResponse);
							});
				},
				getMyFriendRequests : function() {
					return $http.get(BASE_URL + '/getMyFriendRequests/').then(
							function(response) {
								// alert("success")
								// alert(response.data)
								return response.data;
							}, function(errResponse) {
								console.error('Error while creating friend');
								return $q.reject(errResponse);
							});
				},
				getMyFriends : function() {
					return $http.get(BASE_URL + '/myFriends').then(
							function(response) {
								return response.data;
								alert(response.data)
							}, null);
				},

			};

		} ]);