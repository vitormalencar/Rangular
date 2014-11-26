'use strict';

/**
 * @ngdoc function
 * @name olimpoWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the olimpoWebApp
 */
angular
    .module('olimpoWebApp.login', ['ngRoute', 'ngResource'])

/*
 ------------------------------------------------------------------------------
 | Routers of [Entitty name]                                                  |
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
                        console.log(localStorage.getItem('User') !== 'null');
                        var deferred = $q.defer();
                        if (localStorage.getItem('User') !== 'null') {
                            deferred.reject();
                            $location.path('/produto');

                        } else {
                            console.log("passei direto ", localStorage.getItem('User'));
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
 | Controllers  of [Entitty name]                                             |
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
                    var user = localStorage.getItem('User');
                    user = JSON.parse(user);
                    console.log(user);
                    $location.path('/produto');
                })

            .error(function(data, status, headers, config) {
                console.log(data, status);
                $scope.dataLoading = false;
                // $scope.error = data.error;
            })
        }
    }
]);