(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('oil', {
            url: '/oil',
            templateUrl: 'angularjs/controller/oil/oil.html',
            controller: 'oilController',
            controllerAs: 'vm'
        });
    }
})();
