(function () {
    'use strict';

    angular
        .module('app')
        .directive('navbarDirective', navbarDirective);

    function navbarDirective() {
        // Usage: ...
        var directive = {
            restrict: 'AE',
            templateUrl: 'angularjs/directive/navbar/navbar.html',
            scope: {
                allResources: '='
            },
            link: link,
            controller: navbarDirectiveController,
            controllerAs: 'vm'
        };
        return directive;

        ////////////////////////////
        function link() {
        }
    }
    navbarDirectiveController.$inject = ['$scope' , '$localStorage'];
    function navbarDirectiveController($scope , $localStorage) {
        var vm = this;
        vm.allResources = {};
        getAmountOfProducts();

        $scope.$watch('allResources', function (value) {
            if (value !== undefined) {
                vm.allResources = value;
            }
        }, false);


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
