/**
 * Created by berthsa on 27/03/14.
 */
(function () {
    'use strict';

    var controllerId = 'signup';

    angular.module('samdev.authentication.controllers').controller(controllerId, ['$rootScope', '$scope', '$http', '$state', controllerFunc]);

    function controllerFunc($rootScope, $scope, $http, $state) {
        console.log(controllerId + ' loaded');

        $scope.vm = {
            user: {
                email: '',
                password: ''
            }
        }

        $scope.submit = function () {
            $http.post('/signup', {email: $scope.vm.user.email, password: $scope.vm.user.password})
                .success(function (data, status, headers, config) {
                    $rootScope.isAuthenticated = true;
                    $rootScope.user = data.user;
                    $state.transitionTo('home');
                })
                .error(function (data, status, headers, config) {
                    console.log('error occured');
                });
        }
    }
})();