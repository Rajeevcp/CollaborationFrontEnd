'use strict';

app.service('jobService', [
		'$http',
		'$q',
		'$rootScope',
		function($http, $q, $rootScope) {

			console.log("Job Service...")

			var BASE_URL = 'http://localhost:8083/CollaborationRestService'

			return {
				
				
				createjob : function(job) {
					console.log("calling create job")
					return $http.post(BASE_URL + '/job/create', job) // 1
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while creating job');
						return $q.reject(errResponse);
					});
				},
				
				jobApplication : function(appliedJob) {
					
					return $http.post(BASE_URL + '/job/apply', appliedJob) // 1
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while applying job');
						return $q.reject(errResponse);
					});
				},
				
				
				updateJobs : function(job) {
					console.log('Calling Update Job services')
					return $http.put(BASE_URL + '/job/update',job)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while update Job');
						return $q.reject(errResponse);
					});
				},
				fetchAlljob : function() {
					console.log("calling fetchAllJobs ")
					return $http.get(BASE_URL + '/jobs').then(
							function(response) {
								return response.data;
							}, null);
				},
				
				fetchuserAppliedJobs : function(id) {
					console.log("calling fetch Appled AllJobs service "+id)
					return $http.get(BASE_URL + '/job-applied/'+id).then(
							function(response) {
								return response.data;
							}, null);
				},
				
				
				getjob : function(id) {
					console.log("calling get Job " + id)
					return $http.get(BASE_URL + '/job/' + id).then(
							function(response) {
								return response.data;
							}, null);
				},
				
				
				
			}
		} ]);