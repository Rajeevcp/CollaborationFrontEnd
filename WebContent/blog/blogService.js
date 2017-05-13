'use strict';

app.service('blogService', [
		'$http',
		'$q',
		'$rootScope',
		function($http, $q, $rootScope) {

			console.log("Blog Service...")

			var BASE_URL = 'http://localhost:8083/CollaborationRestService'

			return {

				fetchAllblog : function() {
					console.log("calling fetchAllBlogs ")
					return $http.get(BASE_URL + '/blogs').then(
							function(response) {
								return response.data;
							}, null);
				},

				getblog : function(id) {
					console.log("calling get Blogs " + id)
					return $http.get(BASE_URL + '/blog/' + id).then(
							function(response) {
								return response.data;
							}, null);
				},

				createBlog : function(blog) {
					console.log("calling create blog")
					
					return $http.post(BASE_URL + '/blog/create', blog) // 1
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while creating user');
						return $q.reject(errResponse);
					});
				},
				updateBlogs : function(blog) {
					console.log("calling update blog")
					return $http.put(BASE_URL + '/blog/update', blog) // 1
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while update blog');
						return $q.reject(errResponse);
					});
				},

			}

		} ]);