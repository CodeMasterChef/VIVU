(function () {
    'use strict';
    angular
        .module('app')
        .controller('checkCarController', checkCarController);

    checkCarController.$inject = ['carService'];
    function checkCarController(carService) {
        var vm = this;
        vm.carList =
            init();

        function init() {
            loadCars();
        }
        function loadCars() {
            carService.getCarsByUser().then(function (response) {
                vm.carList = response.data;
            });
        }

    }
})();
