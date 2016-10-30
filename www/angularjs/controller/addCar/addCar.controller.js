(function () {
    'use strict';
    angular
        .module('app')
        .controller('addCarController', addCarController);

    addCarController.$inject = ['$rootScope', '$localStorage', '$state', 'toastr', '$timeout', '$log', '$q', 'carService'];


    function addCarController($rootScope, $localStorage, $state, toastr, $timeout, $log, $q, carService) {
        var vm = this;

        vm.addCar = addCar;
        function addCar(trademark, model) {
            carService.addCarToUser(trademark, model)
                .then(function (response) {
                    if (response.status === 200) {
                        toastr.success('Thêm thông tin xe thành công');
                        $state.go('home.checkCar');
                    } else {
                        toastr.error('Thông tin cung cấp không chính xác.');
                    }

                }, function () {
                    toastr.error('Đã có lỗi xảy ra');
                });
        }
    }


})();
