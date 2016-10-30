(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];
   
    function config($stateProvider) {
        $stateProvider.state('home.addCar', {
            url: '/addCar',
            templateUrl: 'angularjs/controller/addCar/addCar.html',
            controller: 'addCarController',
            controllerAs: 'vm',
            resolve: {
            }
        });
    }
})();
