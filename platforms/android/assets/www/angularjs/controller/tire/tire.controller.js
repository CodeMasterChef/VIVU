(function () {
    'use strict';
    angular
        .module('app')
        .controller('tireController', tireController);

    tireController.$inject = ['$state', '$rootScope', 'tireService', '$mdDialog', '$localStorage', '$scope'];
    function tireController($state, $rootScope, tireService, $mdDialog, $localStorage, $scope) {
        var vm = this;
        vm.tireList = [];

        vm.addProduct = addProduct;
        vm.showDetails = showDetails;
        loadTires();

        function loadTires() {
            tireService.getTires().then(function (response) {
                vm.tireList = response.data;
            });
        }
        function addProduct(tire) {
            // count up total amount by 1
            $rootScope.totalAmount++;

            var product = {
                'id': tire.id,
                'productTypeId': tire.productTypeId,
                'amount': 1
            };
            var products = $localStorage.products;
            var isExist = false;
            for (var i = 0; i < products.length; i++) {
                if (products[i].id === product.id && products[i].productTypeId === product.productTypeId) {
                    products[i].amount++;
                    isExist = true;
                }
            }
            if (!isExist) {
                products.push(product);
            }
            $localStorage.products = products;
            // go the cart page
            $localStorage.stateBeforeGoCarPage = 'home.tire';
            $state.go('home.cart');
        }

        function showDetails(tire) {
            vm.tireDetail = tire;

            // $localStorage.tireDetails = tire;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'angularjs/controller/tire/dialogTire.tmpl.html',
                parent: angular.element(document.body),
                // targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
        }
        function DialogController($scope, $mdDialog) {

            $scope.tire = vm.tireDetail;


            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }


    }
})();
