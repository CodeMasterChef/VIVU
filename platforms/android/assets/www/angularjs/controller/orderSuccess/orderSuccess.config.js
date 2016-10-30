(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];
   
    function config($stateProvider) {
        $stateProvider.state('orderSuccess', {
            url: '/orderSuccess',
            templateUrl: 'angularjs/controller/orderSuccess/orderSuccess.html',
            controller: 'OrderSuccessController',
            controllerAs: 'vm'
        });
    }
})();
