(function () {
    'use strict';
    angular
        .module('app')
        .controller('batteryController', batteryController);

    batteryController.$inject = ['batteryService'];

    function batteryController(batteryService) {

        var vm = this;
        vm.totalItems = 0;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.pageChanged = pageChanged;

        var backupResouces = {};
        init();
        function init() {
            getListBattery();


        }

        function getListBattery() {
            batteryService.getListBattery().then(function (response) {
                vm.allResourcesForBattery = {
                    'title': {
                        'name': 'Thương hiệu',
                        'capacity': 'Quy cách',
                        'type': 'Loại',
                        'dimension': 'Kích thước',
                        'price': 'Giá'
                    },
                    'data': response.data,
                    'canNotFindMessage': '',
                    'heading': 'Mâm xe'
                };
                vm.totalItems = response.data.length;
                backupResouces = response.data;
            });

        }
        function pageChanged() {
            var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
            var end = begin + vm.itemsPerPage;
            vm.allResourcesForbattery.data = backupResouces.slice(begin, end);
        }

    }
})();