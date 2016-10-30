(function () {
    'use strict';
    angular
        .module('app')
        .controller('accessoryController', accessoryController);

    accessoryController.$inject = ['$rootScope', '$localStorage', '$state', 'toastr', '$timeout', 'carService'];


    function accessoryController($rootScope, $localStorage, $state, toastr, $timeout, carService) {
        var vm = this;
        var listProducts = [];
        vm.userCarList = [];
        vm.relativeTireList = [];
        vm.relativeOilList = [];
        vm.relativeBatteryList = [];
        vm.relativeWheelList = [];
        vm.checkboxTire = true;
        vm.checkboxOil = true;
        vm.checkboxBattery = true;
        vm.checkboxWheel = true;
        vm.addShoppingCart = addShoppingCart;
        vm.loadTab = loadTab;
        vm.search = search;
        vm.resetData = resetData;
        init();

        function init() {
            loadCarList(loadTab);
            if ($localStorage.products !== undefined) {
                listProducts = $localStorage.products;
            }
        }

        function loadCarList(callback) {
            carService.getCarsByUser().then(function (response) {
                vm.userCarList = response.data;
                callback(vm.userCarList[0]);
            });

        }

        function loadRelativeTire(carId) {
            carService.getRelativeTire(carId).then(function (response) {
                vm.relativeTireList = response.data;
            });
        }

        function loadRelativeOil(carId) {
            carService.getRelativeOil(carId).then(function (response) {
                vm.relativeOilList = response.data;
            });
        }

        function loadRelativeBattery(carId) {
            carService.getRelativeBattery(carId).then(function (response) {
                vm.relativeBatteryList = response.data;
            });
        }

        function loadRelativeWheel(carId) {
            carService.getRelativeWheel(carId).then(function (response) {
                vm.relativeWheelList = response.data;
            });
        }

        function loadTab(car) {
            if (car !== undefined) {
                loadRelativeTire(car.id);
                loadRelativeOil(car.id);
                loadRelativeBattery(car.id);
                loadRelativeWheel(car.id);
            }
        }

        function search(trademark, model) {
            carService.getCarByTrademarkAndModel(trademark, model).then(function (response) {
                loadTab(response.data);
            });
        }

        function resetData() {
            vm.relativeTireList = [];
            vm.relativeOilList = [];
            vm.relativeBatteryList = [];
            vm.relativeWheelList = [];
        }

        function addShoppingCart(id, productTypeId) {
            // count up total amount by 1
            $rootScope.totalAmount++;

            var product = { 'id': id, 'productTypeId': productTypeId, 'amount': 1 };
            var key = false;
            if (listProducts.length === 0) {
                listProducts.push(product);
            } else {
                for (var i = 0; i < listProducts.length; i++) {
                    if (product.id === listProducts[i].id && product.productTypeId === listProducts[i].productTypeId) {
                        listProducts[i].amount++;
                        key = true;
                    }
                }
                if (key === false) {
                    listProducts.push(product);
                }
            }
            // save to local storage
            $localStorage.products = listProducts;
            // go the cart page
            $localStorage.stateBeforeGoCarPage = 'home.accessory';
            $state.go('home.cart');

        }

        function calculateTotalPrice(productList) {
            var totalPrice = 0;
            if (productList !== undefined) {
                for (var i = 0; i < productList.length; i++) {
                    totalPrice = totalPrice + productList[i].price * productList[i].amount;
                }
            }
            return totalPrice;
        }

    }
})();
