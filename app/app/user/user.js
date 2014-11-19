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
 		'desrtoy': { method: 'DELETE' }
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

 	$scope.set_userList = function() {
 		$scope.usuarios = userService.query();

 	};
 	$scope.delete_User = function (userId) {
 		userService.desrtoy({ id: userId });
 		$scope.set_userList();
 	};

 	$scope.add_user = function () {
 		var user = {nome:'Vitor'+Math.random(),email:'teste'};
 		userService.create(user);
 		$scope.set_userList();
 	};

 	$scope.update_user = function(userId){
 		var user = userService.get({id: userId});
 		 user.id = userId;
 		 user.nome = "Roberto Vitor MAia";
 		 user.email = "Vitor Alencar";
 		 user.$update({id: userId});
 		// console.log(user);
 		// userService.update({ id: userId }, user);
 		 $scope.set_userList();
 	}
 	$scope.set_userList();
 }]);

