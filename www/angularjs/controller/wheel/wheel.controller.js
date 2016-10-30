(function () {
    'use strict';
    angular
        .module('app')
        .controller('wheelController', wheelController);

    wheelController.$inject = ['wheelService'];

    function wheelController(wheelService) {

        var vm = this;
        vm.totalItems = 0;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.pageChanged = pageChanged;

        var backupResouces = {};
        init();
        function init() {
            getListWheel();


        }

        function getListWheel() {
            wheelService.getListWheel().then(function (response) {
                vm.allResourcesForWheel = {
               'title': {
                    'size': 'Kích thước',
                    'hole': 'Số lỗ',
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
            vm.allResourcesForwheel.data = backupResouces.slice(begin, end);
        }

    }
})();