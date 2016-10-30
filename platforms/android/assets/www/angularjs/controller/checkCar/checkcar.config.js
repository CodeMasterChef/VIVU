(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('home.checkCar', {
            url: '/checkCar',
            templateUrl: 'angularjs/controller/checkCar/checkCar.html',
            controller: 'checkCarController',
            controllerAs: 'vm',
             resolve: {
                authentication: function (authenticationService) {
                    return authenticationService.checkLogin();
                }
            }
        });
    }
})();
