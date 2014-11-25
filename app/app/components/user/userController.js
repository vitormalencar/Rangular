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
 | Routers of [Entitty name]                                                  |
 ------------------------------------------------------------------------------
 */

 .config(['$routeProvider', function($routeProvider) {
 	$routeProvider.when('/user', {
 		templateUrl: 'components/user/user.html',
 		controller: 'UserCtrl'
 	});
 }])


/*
 ------------------------------------------------------------------------------
 | Controllers  of [Entitty name]                                             |
 ------------------------------------------------------------------------------
 */

 .controller('UserCtrl', ['$scope','UserService',function ($scope,UserService){

 	// $scope.usuarios = UserService.query();

 	$scope.set_UserList = function() {
 		UserService.index().$promise.then(function(users) {
 			console.log('Ok  Marcelo deu certo');
 			$scope.usuarios = users;
 		},
 		function(response){
 			console.log(response);
 		}
 		);
 	};

 	$scope.delete_User = function (id) {
 		UserService.desrtoy({ id: id }).$promise.then(
 			function(response){
 				//console.log('Usuario Deletado'); console.log(response);
 				$scope.set_UserList();
 			},
 			function(response){
 				console.log(response);
 			}
 			);
 	};

 	$scope.add_User = function () {
 		var user = {nome:'Vitor'+Math.random(),email:'vitor@mail'};
 		UserService.save(user).$promise.then(
 			function(){
 				console.log('Usuario Criado '+user.nome);
 				$scope.set_UserList();
 			}
 			);
 	};

 	$scope.update_User = function(id){
 		var user = UserService.show({id: id}).$promise.then(function(){
 			user.id = id;
 			user.nome = "Roberto Vitor MAia";
 			user.email = "vitor2@mail.com";
 			UserService.update({ id: id }, user).$promise.then(function(){
 				console.log('Usuario '+user.nome+' atualizado');
 				$scope.set_UserList();
 			});

 		});
 	}
 	$scope.set_UserList();
 }]);

