'use strict';

app.controller('blogController', [
		'$scope',
		'blogService',
		'$location',
		'$rootScope',
		'$cookieStore',
		'$window',
		'$http',
		'$routeParams',
		function($scope, blogService, $location, $rootScope, $cookieStore,
				$window, $http, $routeParams) {
			$scope.$routeParams = $routeParams;

			console.log("UserController..." + $scope.$routeParams.param1)

			$scope.blog = {};
			this.currentBlog = {
				id : '',
				title : '',
				reason : '',
				description : '',
				date_time : '',
				status : '',
				user_id : ''
			};
			$scope.blogs = [];

			$scope.getAllBlogs = function() {

				console.log("fetchAllBlogs...")
				blogService.fetchAllblog().then(function(d) {
					$scope.blogs = d;
				}, function(errResponse) {
					console.error('Error while fetching Blogs');
				});

			};

			$scope.getAllBlog = function() {

				$scope.getAllBlogs();
			}

			$scope.createBlog = function(blog) {
				console.log(blog.user_id)
				console.log(blog.id)
				console.log(blog.status)
				console.log("create Blog STarted...")
				blogService.createBlog(blog).then(function(d) {

					alert("Blog Added Successfully")
					$location.path("/myBlog")
				}, function(errResponse) {
					console.error('Error while creating Blog.');
				});
			};

			$scope.createblog = function() {
				{
					console.log('Saving New Blog' + $scope.blog.id);
					$scope.blog.status = 'P'
					$scope.createBlog($scope.blog);
				}

			};

			$scope.editBlog = function(id) {

				console.log("Get blob..." + id)
				blogService.getblog(id).then(function(d) {
					$rootScope.currentBlog = d;

				}, function(errResponse) {
					console.error('Error while fetching Blogs');
				});

			};

			$scope.blogEdit = function(id) {
				{
					console.log('Editting  Blog' + id);
					$scope.editBlog(id);
				}

			};

			$scope.updateBlog = function(blog) {

				blogService.updateBlogs(blog).then(function(d) {

					$location.path("/myBlog")
				}, function(errResponse) {
					console.error('Error while Updating Blog.');
				});
			};

			$scope.blog_update = function() {
				{
					console.log('Updating blog with id' + $scope.blog.id);
					$scope.updateBlog($scope.blog);
				}

			};

			$scope.getSingleBlog = function(id) {

				console.log("Get blog..." + id)
				blogService.getblog(id).then(function(d) {
					$rootScope.currentBlog = d;

				}, function(errResponse) {
					console.error('Error while fetching Blogs');
				});

			};

			$scope.single_blog = function(id) {
				{
					console.log('Getting single blog with id' + id);
					$scope.getSingleBlog(id);
				}

			};
			$scope.blogAccepts = function(blog) {
				blog.status = 'Y';
				blogService.updateBlogs(blog).then(function(d) {

					$location.path("/blog-manage")
				}, function(errResponse) {
					console.error('Error while Updating Blog.');
				});

			};

			$scope.blogAccept = function(blog) {
				{
					console.log('Accepting Blog' + blog.title);
					$scope.blogAccepts(blog);
				}

			};
			$scope.blogRejects = function(blog) {
				blog.status = 'N';
				blogService.updateBlogs(blog).then(function(d) {

					$location.path("/blog-manage")
				}, function(errResponse) {
					console.error('Error while Updating Blog.');
				});

			};
			
			$scope.blogReject = function(blog) {
				{
					console.log('Rejecting Blog' + blog.title);
					$scope.blogRejects(blog);
				}

			};

		} ]);