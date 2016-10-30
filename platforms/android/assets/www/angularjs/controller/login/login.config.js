(function () {
    'use strict';
    angular
        .module('app')
        .config(config)
        .factory();

    config.$inject = ['$httpProvider', '$urlRouterProvider', '$stateProvider'];
    /* @ngInject */
    function config($httpProvider, $urlRouterProvider, $stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'angularjs/controller/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve: {
            }
        });
    }
})();
