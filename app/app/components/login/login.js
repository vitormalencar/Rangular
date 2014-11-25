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
 		templateUrl: 'components/login/login.html',
 		controller: 'LoginCtrl',
 	});
 }])


/*
 ------------------------------------------------------------------------------
 | Controllers  of [Entitty name]                                             |
 ------------------------------------------------------------------------------
 */

 .controller('LoginCtrl', ['$scope','$rootScope','$http','$location',function ($scope,$rootScope,$http,$location){
 	$http.get('http://0.0.0.0:3000/users/sign_in')
 	.success(function(data) {

 		console.log(data);
 	})

 	$scope.login = function () {
 		$scope.dataLoading = true;
 		$http.post('http://0.0.0.0:3000/users/sign_in',{user: {email: $scope.Email, password: $scope.Senha} })
 		.success(function(data) {
 			$rootScope.user = data;
 			console.log($rootScope.user);
 			$location.path('/produto');
 		})
 		.error(function(data, status, headers, config) {
 			console.log(data.error);
 			$scope.dataLoading = false;
 			$scope.error = data.error;
 		})
 	};
 }]);

