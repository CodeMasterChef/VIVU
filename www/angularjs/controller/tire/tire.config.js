(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('home.tire', {
            url: '/tire',
            templateUrl: 'angularjs/controller/tire/tire.html',
            controller: 'tireController',
            controllerAs: 'vm',
             resolve: {
                authentication: function (authenticationService) {
                    return authenticationService.checkLogin();
                }
            }
        });
    }
})();
