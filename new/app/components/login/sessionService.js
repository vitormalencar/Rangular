angular.module('olimpoWebApp.sessionService', [])

.service('authService', ['$q', '$http','$location',
    function($q, $http,$location) {

        var authUser = null;

        return {

            login: function(email, senha) {

                var defer = $q.defer();
                $http.post('http://0.0.0.0:3000/users/sign_in', {
                    user: {
                        email: email,
                        password: senha
                    }
                })
                    .success(function(data) {
                        authUser = data;
                        localStorage.setItem('User', JSON.stringify(authUser));
                        $location.path('/produto');
                    })
                    .error(function(error) {
                        console.log(error);
                    })

                return defer.promise;
            },

            getUser: function() {
            	authUser = localStorage.getItem('User')
                return authUser;
            },

            isAuthenticaded: function() {
                return authUser != null;
            },
            teste: function() {
                console.log('auth');
            }
        }
    }
])