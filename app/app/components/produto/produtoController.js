'use strict';

/**
 * @ngdoc function
 * @name olimpoWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the olimpoWebApp
 */
angular
    .module('olimpoWebApp.produtoController', ['ngRoute', 'ngResource'])


/*
 ------------------------------------------------------------------------------
 | Routers of [Entitty name]                                                  |
 ------------------------------------------------------------------------------
 */

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/produto', {
                templateUrl: 'components/produto/produto.html',
                controller: 'ProdutoCtrl',
                resolve: {
                    userVerification: ['$location', '$rootScope', '$http', '$q', '$timeout',
                        function($location, $rootScope, $http, $q, $timeout) {
                            console.log(localStorage.getItem('User') === 'null');
                            var deferred = $q.defer();
                            if (localStorage.getItem('User') === 'null') {
                                deferred.reject();
                                $location.path('/login');

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

.controller('ProdutoCtrl', ['$scope', '$rootScope', 'ProdutoService',
    function($scope, $rootScope, ProdutoService) {

        $scope.index = function() {
            ProdutoService.index().$promise.then(
                function(produtos) {
                    $scope.produtos = produtos;
                },
                function(response) {
                    if (response.headers('User')) {
                        var user = localStorage.getItem('User');
                        user = JSON.parse(user);
                        console.log(user);
                    }

                }
            )
        };

        $scope.delete = function(id) {
            ProdutoService.desrtoy({
                id: id
            }).$promise.then(
                function(success) {
                    $scope.index();
                },
                function(error) {
                    console.log(error);
                }
            )
        };

        $scope.create = function() {
            var produto = {
                nome: 'Produto'
            };
            ProdutoService.save(produto).$promise.then(
                function() {
                    var user = localStorage.getItem('User');
                    user = JSON.parse(user);
                    console.log(user);
                    $scope.index();
                },
                function(error) {
                    console.log(error);
                }
            )
        };

        $scope.update = function(id) {
            var produto = ProdutoService.show({
                id: id
            }).$promise.then(function() {
                produto.nome = "produto update ! ";
                ProdutoService.update({
                    id: id
                }, produto).$promise.then(function() {
                    $scope.index();
                })

            });
        }
        $scope.index();
    }
]);