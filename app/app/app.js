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
  'olimpoWebApp.login',
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
    
    $httpProvider.interceptors.push(['$rootScope', function($rootScope) {
      return {
        request: function (config) {
          config.headers['X-CSRF-Token'] = $rootScope.x_csrf_token;
          return config;
        },
        response: function (result) {
          var x_csrf_token = result.headers('X-CSRF-Token');
          if(x_csrf_token){
            $rootScope.x_csrf_token = x_csrf_token;
          }
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
}]);


