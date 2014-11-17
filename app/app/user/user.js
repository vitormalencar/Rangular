'use strict';

/**
 * @ngdoc function
 * @name olimpoWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the olimpoWebApp
 */
 angular

 .module('olimpoWebApp.user',['ngRoute','ngResource'])

//  .provider('myCSRF',[function(){
//  	var headerName = 'X-CSRFToken';
//  	var cookieName = 'X-CSRFToken';
//  	var allowedMethods = ['POST'];

//  	this.setHeaderName = function(n) {
//  		headerName = n;
//  	}
//  	this.setCookieName = function(n) {
//  		cookieName = n;
//  	}
//  	this.setAllowedMethods = function(n) {
//  		allowedMethods = n;
//  	}
//  	this.$get = ['$cookies', function($cookies){
//  		return {
//  			'request': function(config) {
//  				if(allowedMethods.indexOf(config.method) === -1) {
//           // do something on success
//           config.headers[headerName] = $cookies[cookieName];
//       }
//       return config;
//   }
// }
// }];
// }])

//  .config(function($httpProvider) {
//  	$httpProvider.interceptors.push('myCSRF');
//  })


 /*
 ------------------------------------------------------------------------------
 | Factory of [service name]                                                 |
 ------------------------------------------------------------------------------
 */

 .factory('userService', function($resource){
 	return $resource('http://0.0.0.0:3000/users/:id', { id: '@_id' },
 	{
 		'create':  { method: 'POST' },
 		'index':   { method: 'GET', isArray: true },
 		'show':    { method: 'GET', isArray: false },
 		'update':  { method: 'PUT' },
 		'destroy': { method: 'DELETE' }
 	}
 	);
 })


 /*
 ------------------------------------------------------------------------------
 | Routers of [Entitty name]                                                  |
 ------------------------------------------------------------------------------
 */

 .config(['$routeProvider', function($routeProvider) {
 	$routeProvider.when('/user', {
 		templateUrl: 'user/user.html',
 		controller: 'UserCtrl'
 	});
 }])


/*
 ------------------------------------------------------------------------------
 | Controllers  of [Entitty name]                                             |
 ------------------------------------------------------------------------------
 */

 .controller('UserCtrl', ['$scope','userService', function ($scope,userService) {

 	$scope.usuarios = [];

 	$scope.set_userList = function() {
 		userService
 		.query(function(data){
 			$scope.usuarios = data;
 		});
 	};

 	$scope.add_user = function () {
 		var user = new userService;
 		user.nome = "vitor";
 		user.email= "teste";
 		console.log($scope.cookies)
 		userService.save(user);
 	};

 	$scope.set_userList();
 	$scope.add_user();
 }]);

