(function() {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('home.store', {
            url: '/store',
            templateUrl: 'angularjs/controller/store/store.html',
            controller: 'StoreController',
            controllerAs: 'vm',
            resolve: {}
        });
    }
})();