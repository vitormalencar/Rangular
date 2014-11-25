'use strict';

/**
 * @ngdoc function
 * @name olimpoWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the olimpoWebApp
 */
 angular
 .module('olimpoWebApp.produtoController',['ngRoute','ngResource'])



 /*
 ------------------------------------------------------------------------------
 | Routers of [Entitty name]                                                  |
 ------------------------------------------------------------------------------
 */

 .config(['$routeProvider', function($routeProvider) {
 	$routeProvider
 	.when('/produto', {
 		templateUrl: 'components/produto/produto.html',
 		controller: 'ProdutoCtrl',
 	})
 }])


/*
 ------------------------------------------------------------------------------
 | Controllers  of [Entitty name]                                             |
 ------------------------------------------------------------------------------
 */

 .controller('ProdutoCtrl', ['$scope','$rootScope','ProdutoService',function ($scope,$rootScope,ProdutoService){

 	$scope.index = function() {
 		ProdutoService.index().$promise.then(
 			function(produtos) {
 				// console.log('Ok  Marcelo deu certo');
 				$scope.produtos = produtos;
 			},
 			function(response){
 				console.log(response);
 			}
 			);
 	};

 	$scope.delete = function (id) {
 		ProdutoService.desrtoy({ id: id }).$promise.then(
 			function(success){
 				// console.log('Contunua sem da erros Marcelo');
 				$scope.index();
 			},
 			function(error){
 				console.log(error);
 			}
 			);
 	};

 	$scope.create = function () {
 		var produto = {nome:'Produto'};
 		ProdutoService.save(produto).$promise.then(
 			function(){
 				console.log(localStorage.getItem.User);
 				$scope.index();
 			},
 			function(error){
 				console.log(error);
 			}
 			);
 	};

 	$scope.update = function(id){
 		var produto = ProdutoService.show({id: id}).$promise.then(function(){
 			produto.nome = "produto update ! ";
 			ProdutoService.update({ id: id }, produto).$promise.then(function(){
 				// console.log('Ainda Funcionando Marcelo');
 				$scope.index();
 			});

 		});
 	}
 	$scope.index();
 }]);

