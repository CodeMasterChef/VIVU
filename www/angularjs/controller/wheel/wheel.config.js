(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('wheel', {
            url: '/wheel',
            templateUrl: 'angularjs/controller/wheel/wheel.html',
            controller: 'wheelController',
            controllerAs: 'vm'
        });
    }
})();
