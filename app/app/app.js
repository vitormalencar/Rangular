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
    .run(['$http', '$location',
        function($http, $location) {
            $http.get('http://0.0.0.0:3000')
                .then(function(response) {
                    localStorage.setItem('User', response.headers('User'));
                }, function(error) {
                    console.log(error);
                    localStorage.setItem('User', null);
                    $location.path('/login');
                })
        }
    ])
    .config(['$httpProvider', '$routeProvider', '$locationProvider',
        function($httpProvider, $routeProvider, $locationProvider) {
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.interceptors.push(['$rootScope',
                function($rootScope) {
                    return {
                        request: function(config) {
                            config.headers['X-CSRF-Token'] = localStorage.getItem('x_csrf_token');
                            return config;
                        },
                        response: function(result) {
                            var x_csrf_token = result.headers('X-CSRF-Token');
                            if (x_csrf_token) {
                                localStorage.setItem('x_csrf_token', x_csrf_token);
                            }
                            return result;
                        }
                    }
                }
            ]);
            /*
 ------------------------------------------------------------------------------
 | Routers of [Application]                                                  |
 ------------------------------------------------------------------------------
 */
            $routeProvider
                .otherwise({
                    redirectTo: '/login'
                })
        }
    ]);