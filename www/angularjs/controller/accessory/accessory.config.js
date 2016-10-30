(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('home.accessory', {
            url: '/accessory',
            templateUrl: 'angularjs/controller/accessory/accessory.html',
            controller: 'accessoryController',
            controllerAs: 'vm',
            resolve: {
            }
        });
    }
})();
