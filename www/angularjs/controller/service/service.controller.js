(function () {
    'use strict';
    angular
        .module('app')
        .controller('serviceController', serviceController);

    serviceController.$inject = ['$rootScope', '$localStorage', '$state', 'toastr', '$timeout', '$log', '$q', 'serviceService'];


    function serviceController($rootScope, $localStorage, $state, toastr, $timeout, $log, $q, serviceService) {
        var vm = this;
        init();
        vm.serviceList = [];
        vm.chooseService = chooseService;
        vm.checkChoose = [];
        vm.buttonTitle = [];
        vm.choosenClass = [];
        vm.minDate = new Date();
        vm.changeAmount = changeAmount;
        vm.flag = [];
        //initiate
        function init() {
            loadServices();
        }

        //load service
        function loadServices() {
            serviceService.getServiceList().then(function (response) {
                vm.serviceList = response.data;
                for (var i = 0; i < response.data.length; i++) {
                    if ($localStorage.amount === undefined) {
                        $localStorage.amount = [];
                    }
                    if ($localStorage.amount[i] !== undefined && $localStorage.amount[i] !== null && $localStorage.amount[i].flag === true) {
                        vm.serviceList[i].amount = $localStorage.amount[i].amount;
                        vm.buttonTitle[i] = 'Bỏ Chọn';
                    } else {
                        vm.serviceList[i].amount = 1;
                        vm.buttonTitle[i] = 'Chọn';
                        $localStorage.amount[i] = {
                            "amount" : 1,
                            "flag" : false
                        }
                    }
                }
            });
        }

        function chooseService(index) {
            vm.checkChoose[index] = !vm.checkChoose[index];
            if (vm.checkChoose[index]) {
                vm.buttonTitle[index] = 'Bỏ Chọn';
                vm.choosenClass[index] = 'choose';
                $localStorage.amount[index].flag = true;
            } else {
                vm.changeAmount(index, 1);
                vm.buttonTitle[index] = 'Chọn';
                vm.choosenClass[index] = 'none-choose';
                $localStorage.amount[index].amount = 1;
                vm.serviceList[index].amount = 1;
                $localStorage.amount[index].flag = false;
            }
        }

        function changeAmount(index, amount) {
            $localStorage.amount[index].amount = amount;
        }
    }
})();
