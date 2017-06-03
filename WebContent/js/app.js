var app = angular.module("myApp", [ 'ngRoute', 'ngCookies',
		'angular-loading-bar' ])
 app.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);




app.config(function($routeProvider) {
	console.log('entering configuration')
	$routeProvider.when('#', {
		controller : 'blogController',
		templateUrl : 'user/homes.html'

	}).when('/login', {
		controller : 'UserController',
		templateUrl : 'user/login.html'
	}).when('/home', {
		// controller:'UserController',
		templateUrl : 'user/home.html'
	}).when('/', {
		controller : 'blogController',
		templateUrl : 'user/homes.html'
	})

	.when('/register', {
		// controller:'UserController',
		templateUrl : 'user/register.html'
	}).when('/blog', {
		controller : 'blogController',
		templateUrl : 'blog/blog.html'
	}).when('/users', {
		controller : 'friendController',
		templateUrl : 'friend/people.html'
	}).when('/friends', {
		controller : 'friendController',
		templateUrl : 'friend/friends.html'
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
	}).when('/search_friend', {
		templateUrl : 'user/search_friend.html',
		controller : 'UserController'
	})

	.when('/blog/:param2', {
		templateUrl : 'blog/singleBlog.html',
		controller : 'blogController'
	}).when('/create_job', {
		templateUrl : 'job/create-job.html',
		controller : 'jobController'
	}).when('/job-manage', {
		templateUrl : 'job/manageJob.html',
		controller : 'jobController'
	}).when('/job', {
		templateUrl : 'job/listJob.html',
		controller : 'jobController'
	})
	.when('/my_profiles', {
		templateUrl : 'event/profile.html',
		controller : 'eventController'
	})
	.when('/myBlog', {
		templateUrl : 'blog/my_blog.html',
		controller : 'blogController'
	})

	.when('/friend/:param1', {
		templateUrl : 'friend/send_request.html',
		controller : 'UserController'
	}).when('/chat', {
		controller : 'ChatCtrl',
		templateUrl : '_chat/chat.html'
	}).when('/test', {
		templateUrl : 'user/sidebar.html'
	})
	.when('/event_create', {
		controller : 'eventController',
		templateUrl : 'event/event_create.html'
	})
	.when('/event-manage', {
		controller : 'eventController',
		templateUrl : 'event/manage_event.html'
	})
	
		.when('/upload', {
		controller : 'eventController',
		templateUrl : 'event/uploadPicture.html'
	})
	
		.when('/event', {
		controller : 'eventController',
		templateUrl : 'event/event_list.html'
	})
	
		.when('/chatbox/:param1', {
		controller : 'friendController',
		templateUrl : 'friend/chatFriend.html'
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
 * $location.path('/'); }
 *  } } );
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
		// delete $rootScope.currentUser;
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
        console.log("------"+$rootScope.currentUser.id)
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