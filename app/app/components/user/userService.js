'use strict';

/**
 * @ngdoc function
 * @name olimpoWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the olimpoWebApp
 */
angular
 .module('olimpoWebApp.userService',[])

 /*
 ------------------------------------------------------------------------------
 | Factory of [User]                                                          |
 ------------------------------------------------------------------------------
 */

 .factory('UserService', function($resource){
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