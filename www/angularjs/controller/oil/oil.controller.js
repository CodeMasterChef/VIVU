(function () {
    'use strict';
    angular
        .module('app')
        .controller('oilController', oilController);

    oilController.$inject = ['oilService'];

    function oilController(oilService) {

        var vm = this;
        vm.totalItems = 0;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.pageChanged = pageChanged;

        var backupResouces = {};
        init();
        function init() {
            getListOil();


        }

        function getListOil() {
            oilService.getListOil().then(function (response) {
                vm.allResourcesForOil = {
                    'title': {
                        'trademark': 'Thương hiệu',
                        'name': 'Tên sản phẩm',
                        'origin': 'Xuất xứ',
                        'acea': 'Chỉ số ACEA',
                        'api': 'Chỉ số API',
                        'jaso': 'Chỉ số JASO',
                        'sae': 'Chỉ số SAE',
                        'feature': 'Tính năng',
                        'price': 'Giá'
                    },
                    'data': response.data,
                    'canNotFindMessage': '',
                    'heading': 'Dầu nhớt'
                };
                vm.totalItems = response.data.length;
                backupResouces = response.data;
            });

        }
        function pageChanged() {
            var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
            var end = begin + vm.itemsPerPage;
            vm.allResourcesForoil.data = backupResouces.slice(begin, end);
        }

    }
})();