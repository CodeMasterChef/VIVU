(function () {
    angular
        .module('app')
        .controller('CoreController', CoreController);

    CoreController.$inject = ['$scope', '$http', '$localStorage', 'carService', 'tireService'];

    /* @ngInject */
    function CoreController($scope, $http, $localStorage, carService, tireService) {
        var vm = this;
        vm.allResources = {};
        vm.allResources.amount = 0;

        init();

        function init() {
            getAmountOfProducts();
        }

        function getAmountOfProducts() {
            if ($localStorage.products !== undefined) {
                var products = $localStorage.products;
                vm.allResources.amount = 0;
                products.forEach(function (element) {
                    vm.allResources.amount += Number(element.amount);
                }, this);
            }
        }
    }
})();
