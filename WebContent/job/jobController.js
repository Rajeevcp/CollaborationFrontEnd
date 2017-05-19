'use strict';

app.controller('jobController', [
		'$scope',
		'jobService',
		'$location',
		'$rootScope',
		'$cookieStore',
		'$window',
		'$http',
		'$routeParams',
		'$filter',
		function($scope, jobService, $location, $rootScope, $cookieStore,
				$window, $http, $routeParams, $filter) {

			$scope.job = {
				id : '',
				title : '',
				qualification : '',
				status : '',
				date_time : '',
				description : '',
				errorCode : '',
				errorMessage : '',
				applied_user_job : ''
			};
			$rootScope.my_id = []
			$rootScope.appliedjob = {
					id : '',
					user_id : '',
					job_id : '',
					status : '',
					date_time : '',
					remarks : '',
					errorCode : '',
					errorMessage : ''
				};
			
			$scope.appliedJob = {
					
					id : '',
					user_id : '',
					job_id : '',
					status : '',
					date_time : '',
					remarks : '',
					errorCode : '',
					errorMessage : ''	
					
			};
		    	
			
			$scope.jobs = [];

			$scope.createJob = function(job) {

				console.log(job.title)
				console.log("create job STarted...")
				jobService.createjob(job).then(function(d) {

					$scope.job = {};
					$scope.suMessage = 'True';
					$location.path("/job")
				}, function(errResponse) {
					console.error('Error while creating Blog.');
				});
			};

			$scope.job_create = function() {
				{
					console.log('Saving New Job' + $scope.job.id);
					$scope.createJob($scope.job);
				}

			};
			$scope.getJobs = function() {

				console.log("fetchAllJobs...")
				jobService.fetchAlljob().then(function(d) {
					$scope.jobs = d;
					
					//alert(JSON.stringify($rootScope.appliedjob))
				}, function(errResponse) {
					console.error('Error while fetching Job');
				});

			};

			$scope.getAllJob = function(id) {
				{
					console.log('Fetching All Job');
					$scope.getJobs();
					
				}

			};

			$scope.getJobById = function(id) {

				console.log("Get job..." + id)
				jobService.getjob(id).then(function(d) {
					$scope.job = d;
					$scope.job.date_time = new Date($scope.job.date_time);
					// alert($scope.job.date_time);

				}, function(errResponse) {
					console.error('Error while fetching Job');
				});

			};

			$scope.jobEdit = function(id) {
				console.log('Get  Job By Id ' + id);
				$scope.getJobById(id);
			}
			$scope.updateJob = function(){
				jobService.updateJobs($scope.job).then(function(d) {
					$scope.job = {};
					$scope.getAllJob()
					$location.path("/job-manage")
				},
				function(errResponse){
					console.error('Error while updating Job')
					
				});
				
			};
			$scope.job_update = function(){
				console.log('Updating Job started '+$scope.job.id)
				$scope.updateJob($scope.job)
			}
			
			$scope.applyJob = function(appliedJob) {

			
				console.log("Apply Job..."+appliedJob.job_id)
				jobService.jobApplication(appliedJob).then(function(d) {
					$scope.fetchuserApplied($rootScope.currentUser.id)

					$scope.show(appliedJob.job_id)
					
				}, function(errResponse) {
					console.error('Error while Applying Job.');
				});
			};
			
			$scope.jobApply = function(id) {
				
				$scope.appliedJob.job_id = id;
				console.log('Applying Job '+$scope.appliedJob.job_id)
				$scope.applyJob($scope.appliedJob)
			}
			
			$scope.fetchuserApplied = function(id) {

				console.log("fetchAllJobs...")
				jobService.fetchuserAppliedJobs(id).then(function(d) {
					$rootScope.appliedjob = d;
					
					 angular.forEach($rootScope.appliedjob, function(value, key) {
					      console.log('key:', key);
					      console.log('value:', value.job_id);
					      $rootScope.my_id.push(value.job_id);
					    });
					
					
				}, function(errResponse) {
					console.error('Error while fetching Job');
				});

			};
			$scope.getUserAppJob = function(id){
				$scope.fetchuserApplied(id);
			}
			
			$scope.show = function(val) {
				//console.log('aaaa'+val)
				var items = $rootScope.my_id;
				//console.log('azx '+$filter('filter')(items, val).length)
				return $filter('filter')(items, val).length > 0;;;
				$location.path("/job")
			}
			

		} ]);