(function () {
    'use strict';
    angular
        .module('app')
        .directive('itemListDirective', itemListDirective);

    function itemListDirective() {
        // Usage: ...
        var directive = {
            restrict: 'AE',
            templateUrl: 'angularjs/directive/itemList/itemList.html',
            scope: {
                allResources: '='
            },
            link: link,
            controller: itemListController,
            controllerAs: 'vm'
        };
        return directive;

        ////////////////////////////
        function link() {
        }
    }
    itemListController.$inject = ['$scope', '$localStorage'];
    function itemListController($scope, $localStorage) {
        var vm = this;
        vm.defaultImageUrl = 'img/nophoto.png';

        vm.allResources = {};

        vm.saveProductToLocalStorage = saveProductToLocalStorage;

        if ($localStorage.products === undefined) {
            $localStorage.products = [];
        }
        /////

        init();

        function init() {

        }
        function saveProductToLocalStorage(id, typeId) {
            var isExisted = false;
            var type = '';
            if (typeId === 1) {
                type = 'tire';
            } else if (typeId === 2) {
                type = 'oil';
            } else if (typeId === 3) {
                type = 'wheel';
            } else if (typeId === 4) {
                type = 'battery';
            }

            $localStorage.products.forEach(function (element) {
                if (element.id === id && element.type === type) {
                    element.amount = Number(element.amount) + 1;
                    isExisted = true;
                }
            }, this);
            if (!isExisted) {
                var product = {
                    'id': id,
                    'type': type,
                    'amount': 1
                };
                $localStorage.products.push(product);
            }
        }

        $scope.$watch('allResources', function (value) {
            if (value !== undefined) {
                vm.allResources = value;
            }
        });
    }

})();
