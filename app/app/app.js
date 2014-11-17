  'use strict';

/**
 * @ngdoc overview
 * @name olimpoWebApp
 * @description
 * # olimpoWebApp
 *
 * Main module of the application.
 */
 angular
 .module('olimpoWebApp', [
  'olimpoWebApp.user',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  ])


.config(['$httpProvider','$routeProvider', function($httpProvider,$routeProvider) {
    /*
    * httpProvide set the credencial cookies write  true
    */
    $httpProvider.defaults.withCredentials = true;


 /*
 ------------------------------------------------------------------------------
 | Routers of [Application]                                                  |
 ------------------------------------------------------------------------------
 */
 $routeProvider
 .otherwise({
  redirectTo: '/user'
});

}]);


