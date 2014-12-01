 'use strict';

/**
 * @ngdoc function
 * @name olimpoWebApp.Service:ProdutoService
 * @description
 * # ProdutoService
 * Service of the olimpoWebApp
 */
 angular
 .module('olimpoWebApp.produtoService',[])
/*
 ------------------------------------------------------------------------------
 | Factory of [Produto]                                                       |
 ------------------------------------------------------------------------------
 */

 .factory('ProdutoService', function($resource){
 	return $resource('http://0.0.0.0:3000/produtos/:id', { id: '@_id' },
 	{
 		'create':  { method: 'POST' },
 		'index':   { method: 'GET', isArray: true },
 		'show':    { method: 'GET', isArray: false },
 		'update':  { method: 'PUT' },
 		'desrtoy': { method: 'DELETE' }
 	}
 	);
 })
