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

 .controller('UserCtrl', ['$scope','$cookies','userService', function ($scope,$cookies,userService) {

 	$scope.usuarios = [];

 	$scope.set_userList = function() {
 		userService
 		.query(function(data){
 			$scope.usuarios = data;
 		});
 	};

 	$scope.add_user = function () {
 		var user = new userService;
 		user.nome = "vitor"+Math.random();
 		user.email= "teste";
 		userService.save(user);
 	};
 	$scope.set_userList();
 }]);

