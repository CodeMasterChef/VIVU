(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('home.service', {
            url: '/service',
            templateUrl: 'angularjs/controller/service/service.html',
            controller: 'serviceController',
            controllerAs: 'vm',
             resolve: {
                authentication: function (authenticationService) {
                    return authenticationService.checkLogin();
                }
            }
        });
    }
})();
