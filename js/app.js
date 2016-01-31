var app = angular.module("toySearch", ['elasticsearch', 'ngRoute'],
	['$locationProvider', function($locationProvider){
		$locationProvider.html5Mode({
			enabled:true,
			requireBase: false
		});
	}]
);

/*
app.config(['$routeProvider', 
	function($routeProvider){
		$routeProvider.
		when('/IR_NavProject/index.html', {
			templateUrl: 'templates/startMenu.html'
		})
		.when('/IR_NavProject/index.html?q=Lego', {
			templateUrl: 'templates/results.html'
		})
		.otherwise({
			redirectTo: '/IR_NavProject/index.html'
		});
}]);
*/


app.filter('num', function() {
    return function(input) {
      return parseFloat(input, 10);
    };
});