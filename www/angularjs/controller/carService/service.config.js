(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];
   
    function config($stateProvider) {
        $stateProvider.state('service', {
            url: '/service',
            templateUrl: 'angularjs/controller/carService/service.html',
            controller: 'serviceController',
            controllerAs: 'vm'
        });
    }
})();
