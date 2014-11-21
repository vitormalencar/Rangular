'use strict';

/**
 * @ngdoc function
 * @name olimpoWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the olimpoWebApp
 */
 angular
 .module('olimpoWebApp.login',['ngRoute','ngResource'])



 /*
 ------------------------------------------------------------------------------
 | Routers of [Entitty name]                                                  |
 ------------------------------------------------------------------------------
 */

 .config(['$routeProvider', function($routeProvider) {
 	$routeProvider.when('/login', {
 		templateUrl: 'login/login.html',
 		controller: 'LoginCtrl'
 	});
 }])


/*
 ------------------------------------------------------------------------------
 | Controllers  of [Entitty name]                                             |
 ------------------------------------------------------------------------------
 */

 .controller('LoginCtrl', ['$scope','$http','$location',function ($scope,$http,$location){
 	$http.get('http://0.0.0.0:3000/users/sign_in')
 	.success(function(data) {
 		console.log(data);
 	})
 	.error(function(data, status, headers, config) {
 			 // called asynchronously if an error occurs
    		// or server returns response with an error status.
    	});
 	// $scope.logar = function() {
 	// 	$http.post('http://0.0.0.0:3000/users/sign_in',{user: {email: 'vitor@vitor.com', password: '12345678'} })
 	// 	.success(function(data) {
 	// 		console.log(data);
 	// 		$location.path('/user')
 	// 	})
 	// 	.error(function(data, status, headers, config) {
 	// 		 // called asynchronously if an error occurs
  //   		// or server returns response with an error status.
  //   	})
 	// };
 	$scope.login = function () {
 		
 		$scope.dataLoading = true;
 		$http.post('http://0.0.0.0:3000/users/sign_in',{user: {email: $scope.Email, password: $scope.Senha} })
 		.success(function(data) {
 			console.log(data);
 			$location.path('/produto')
 		})
 		.error(function(data, status, headers, config) {
 			console.log(data.error);
 			$scope.dataLoading = false;
 			$scope.error = data.error;
 			
 		})
 	};
 }]);

