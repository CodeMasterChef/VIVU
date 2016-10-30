(function () {
    'use strict';
    angular
        .module('app')
        .controller('serviceController', serviceController);

    serviceController.$inject = ['serviceService'];

    function serviceController(serviceService) {

        var vm = this;
        vm.totalItems = 0;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.pageChanged = pageChanged;
        vm.userInformation = {};
        vm.createOrder = createOrder;

        var backupResouces = {};
        init();
        function init() {
            getListService();

        }

        function getListService() {
            serviceService.getListService().then(function (response) {
                vm.listService = response.data;
                vm.totalItems = response.data.length;
                backupResouces = response.data;
            });

        }
        function pageChanged() {
            var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
            var end = begin + vm.itemsPerPage;
            vm.allResourcesForService.data = backupResouces.slice(begin, end);
        }
        function createOrder() {
            console.log(vm.userInformation);

            if (vm.userInformation.prefix === undefined) {

            }
              if (vm.userInformation.date === null) {

            }
        }


    }
})();