(function() {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('home.cart', {
            url: '/cart',
            templateUrl: 'angularjs/controller/cart/cart.html',
            controller: 'CartController',
            controllerAs: 'vm',
            resolve: {}
        });
    }
})();