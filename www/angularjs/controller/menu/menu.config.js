(function () {
    'use strict';
    angular
        .module('app')
        .config(config)
        .factory();

    config.$inject = ['$httpProvider', '$urlRouterProvider', '$stateProvider'];
    /* @ngInject */
    function config($httpProvider, $urlRouterProvider, $stateProvider) {
        $stateProvider.state('home.menu', {
            url: '',
            templateUrl: 'angularjs/controller/menu/menu.html',
            controller: 'menuController',
            controllerAs: 'vm',
            resolve: {
                authentication: function (authenticationService) {
                    return authenticationService.checkLogin();
                }
            }
        });
    }
})();
