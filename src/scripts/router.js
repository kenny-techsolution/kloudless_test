define(['controllers', 'directives','services'], function() {
	'use strict';
	window.app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
			when('/', {
				templateUrl: 'templates/index.html',
				controller: 'indexController'
			}).
			otherwise({
				redirectTo: '/'
			});
		}
	]);
});