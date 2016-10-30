(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('battery', {
            url: '/battery',
            templateUrl: 'angularjs/controller/battery/battery.html',
            controller: 'batteryController',
            controllerAs: 'vm'
        });
    }
})();
