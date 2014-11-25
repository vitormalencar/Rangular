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
  'olimpoWebApp.login',
  'olimpoWebApp.user',
  'olimpoWebApp.userService',
  'olimpoWebApp.produtoController',
  'olimpoWebApp.produtoService',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  ])
 .config(['$httpProvider','$routeProvider','$locationProvider', function($httpProvider,$routeProvider,$locationProvider) {
    /*
    * httpProvide set the credencial cookies write  true
    */
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push(['$rootScope', function($rootScope) {
      return {
        request: function (config) {
          config.headers['X-CSRF-Token'] = localStorage.getItem('x_csrf_token');
          return config;
        },
        response: function (result) {
          var x_csrf_token = result.headers('X-CSRF-Token');
          var User = result.headers('User');
          if(x_csrf_token){
            localStorage.setItem('x_csrf_token', x_csrf_token);
          }
          if (User) {
            localStorage.setItem('User', angular.fromJson(User));
          };
          return result;
        }
      }
    }]);
 /*
 ------------------------------------------------------------------------------
 | Routers of [Application]                                                  |
 ------------------------------------------------------------------------------
 */
 $routeProvider
 .otherwise({
  redirectTo: '/login'
})
  // $locationProvider.html5Mode(true);
}]);


