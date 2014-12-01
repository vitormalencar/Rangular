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
                userVerification: authUser
            }
        })
    }
])


/*
 ------------------------------------------------------------------------------
 | Controllers  of [Login]                                                    |
 ------------------------------------------------------------------------------
 */

.controller('LoginCtrl', ['$scope', '$http', '$location','authService',
    function($scope, $http, $location,authService) {
        $http.get('http://0.0.0.0:3000/users/sign_in')
        $scope.login = function() {
            $scope.dataLoading = true;
            authService.login($scope.Email,$scope.Senha);
            authService.isAuthenticaded();
        }
    }
]);

//================================================
// Check if the user is connected
//================================================
var authUser = function($location, $rootScope, $http, $q) {
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