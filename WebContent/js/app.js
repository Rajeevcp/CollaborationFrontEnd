var app = angular.module("myApp", [ 'ngRoute', 'ngCookies' ])
app.config(function($routeProvider) {
	console.log('entering configuration')
	$routeProvider.when('/', {
		templateUrl : 'user/home.html'

	}).when('/login', {
		controller : 'UserController',
		templateUrl : 'user/login.html'
	}).when('/home', {
		// controller:'UserController',
		templateUrl : 'user/home.html'
	}).when('/register', {
		// controller:'UserController',
		templateUrl : 'user/register.html'
	}).when('/blog', {
		controller : 'blogController',
		templateUrl : 'blog/blog.html'
	}).when('/users', {
		controller : 'friendController',
		templateUrl : 'friend/people.html'
	})

	.when('/blog-create', {
		controller : 'blogController',
		templateUrl : 'blog/createBlog.html'
	}).when('/blog-manage', {
		controller : 'blogController',
		templateUrl : 'blog/manageBlog.html'
	}).when('/edit-blog/:param1', {
		templateUrl : 'blog/manageBlog.html',
		controller : 'blogController'
	})

	.when('/blog/:param2', {
		templateUrl : 'blog/singleBlog.html',
		controller : 'blogController'
	})
	.when('/create_job', {
		templateUrl : 'job/create-job.html',
		controller : 'jobController'
	})
	.when('/job-manage', {
		templateUrl : 'job/manageJob.html',
		controller : 'jobController'
	})
	.when('/job', {
		templateUrl : 'job/listJob.html',
		controller : 'jobController'
	})
	.when('/profile', {
		templateUrl : 'user/my_profile.html',
		controller : 'UserController'
	})
	.when('/myBlog', {
		templateUrl : 'blog/my_blog.html',
		controller : 'blogController'
	})
	
	.when('/friend/:param1', {
		templateUrl : 'friend/send_request.html',
		controller : 'UserController'
	})

})

/*
 * app.run( function ($rootScope, $location,$cookieStore, $http) {
 * 
 * $rootScope.$on('$locationChangeStart', function (event, next, current) {
 * console.log("$locationChangeStart")
 * //http://localhost:8080/Collaboration/addjob // redirect to login page if not
 * logged in and trying to access a restricted page
 * 
 * var userPages =
 * ['/job','/create_blog','/blog','/edit-blog','/blog-create','/users','/blog']
 * var adminPages = ['/job-manage','/create_job','/blog-manage']
 * 
 * var currentPage = $location.path()
 * 
 * //will return 0 if current page is there in list //else return -1 var
 * isUserPage = $.inArray(currentPage, userPages) var isAdminPage =
 * $.inArray(currentPage, adminPages)
 * 
 * var isLoggedIn = $rootScope.currentUser.id;
 * 
 * console.log("isLoggedIn:" +isLoggedIn) console.log("isUserPage:" +isUserPage)
 * console.log("isAdminPage:" +isAdminPage)
 * 
 * if(!isLoggedIn) {
 * 
 * if (isUserPage===0 || isAdminPage ===0) { console.log("Navigating to login
 * page:") alert("You need to loggin to do this operation")
 * 
 * $location.path('/'); } }
 * 
 * else //logged in {
 * 
 * var role = $rootScope.currentUser.role; console.log("Current
 * page:"+currentPage) console.log("My Role is:"+role)
 * console.log("Checking:"+isAdminPage) if(isAdminPage === 0 && role!='admin' ) {
 * 
 * alert("You can not do this operation as you are logged as : " + role )
 * $location.path('/');
 *  }
 * 
 *  }
 *  } );
 * 
 *  // keep user logged in after page refresh $rootScope.currentUser =
 * $cookieStore.get('currentUser') || {}; if ($rootScope.currentUser) {
 * $http.defaults.headers.common['Authorization'] = 'Basic' +
 * $rootScope.currentUser; }
 * 
 * });
 */
app.run(function($cookieStore, $rootScope, $location, UserService, $http) {
	$rootScope.logout = function() {
		console.log('logout()')
		$rootScope.currentUser = {};
		//delete $rootScope.currentUser;
		$cookieStore.remove('currentUser')
		UserService.logout().then(function(response) {
			console.log("Logged out successfully..");
			$rootScope.message = "Logged out Successfully !";
			$location.path('/login')
		}, function(response) {
			console.log(response.status);
		})
	}

	$rootScope.$on('$locationChangeStart', function(event, next, current) {
		console.log("$locationChangeStart")
		// http://localhost:8080/Collaboration/addjob
		// redirect to login page if not logged in and trying to access a
		// restricted page

		var userPages = [ '/users', '/blog-create', '/job', '/profile',
				'/myBlog', '/viewFriendRequest', '/chat' ]
		var adminPages = [ "/blog-manage", "/job-manage", "/create_job" ]

		var currentPage = $location.path()

		// will return 0 if current page is there in list
		// else return -1
		var isUserPage = $.inArray(currentPage, userPages)
		var isAdminPage = $.inArray(currentPage, adminPages)

		var isLoggedIn = $rootScope.currentUser.id;

		console.log("isLoggedIn:" + isLoggedIn)
		console.log("isUserPage:" + isUserPage)
		console.log("isAdminPage:" + isAdminPage)

		if (!isLoggedIn) {
			console.log('Anonimous User Page Validation')
			if (isUserPage >= 0 || isAdminPage >= 0) {
				console.log("Navigating to login page:")
				alert("You need to loggin to do this operation")

				$location.path('/');
			}
		}

		else // logged in
		{
			console.log('Enter in to logged in user Page Validation')

			var role = $rootScope.currentUser.role;

			if (isAdminPage >= 0 && role != 'admin') {

				alert("You can not do this operation as you are logged as : "
						+ role)
				$location.path('/');

			}

		}

	});

	// keep user logged in after page refresh
	$rootScope.currentUser = $cookieStore.get('currentUser') || {};
	if ($rootScope.currentUser) {
		$http.defaults.headers.common['Authorization'] = 'Basic'
				+ $rootScope.currentUser;
	}
})