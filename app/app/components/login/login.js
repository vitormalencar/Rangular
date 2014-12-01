'use strict';

/**
 * @ngdoc function
 * @name olimpoWebApp.controller:Loigin
 * @description
 * # Loigin
 * Controller of the olimpoWebApp
 */
angular
    .module('olimpoWebApp.login', ['ngRoute', 'ngResource'])

/*
 ------------------------------------------------------------------------------
 | Routers of [Login]                                                         |
 ------------------------------------------------------------------------------
 */

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'components/login/login.html',
            controller: 'LoginCtrl',
            resolve: {
                userVerification: ['$location', '$rootScope', '$http', '$q', '$timeout',
                    function($location, $rootScope, $http, $q, $timeout) {
                        var deferred = $q.defer();
                        if (localStorage.getItem('User') !== 'null') {
                            deferred.reject();
                            console.log("Usuario logado ! , indo para o /produto");
                            $location.path('/produto');
                        } else {
                            console.log("Sem Usuario, indo para o /login");
                            deferred.resolve();
                        };
                        return deferred.promise;
                    }
                ]
            }
        })
    }
])


/*
 ------------------------------------------------------------------------------
 | Controllers  of [Login]                                                    |
 ------------------------------------------------------------------------------
 */

.controller('LoginCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $http.get('http://0.0.0.0:3000/users/sign_in')
        $scope.login = function() {
            $scope.dataLoading = true;
            $http.post('http://0.0.0.0:3000/users/sign_in', {
                user: {
                    email: $scope.Email,
                    password: $scope.Senha
                }
            })
                .success(function(data) {
                    localStorage.setItem('User', JSON.stringify(data));
                    $location.path('/produto');
                })

            .error(function(data, status, headers, config) {
                console.log(data, status);
                $scope.dataLoading = false;
            })
        }
    }
]);