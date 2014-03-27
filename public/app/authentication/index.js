/**
 * Created by berthsa on 27/03/14.
 */
(function () {
    'use strict';
    angular.module('samdev.authentication', ['samdev.authentication.controllers'])
        .config(['$stateProvider', function ($stateProvider) {

            $stateProvider
                .state('signin', {
                    url: '/signin',
                    views: {
                        '': {
                            templateUrl: 'app/authentication/views/signin.html',
                            controller: 'signin'
                        }
                    }
                })
                .state('signup', {
                    url: '/signup',
                    views: {
                        '': {
                            templateUrl: 'app/authentication/views/signup.html',
                            controller: 'signup'
                        }
                    }
                })
        }])
})();
