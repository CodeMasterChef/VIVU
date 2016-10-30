(function () {
    'use strict';

    angular
        .module('app')
        .directive('footerDirective', footerDirective);

    function footerDirective() {
        // Usage: ...
        var directive = {
            restrict: 'AE',
            templateUrl: 'angularjs/directive/footer/footer.html',
            scope: {
                allResources: '='
            },
            link: link,
            controller: footerDirectiveController,
            controllerAs: 'vm'
        };
        return directive;

        ////////////////////////////
        function link() {
        }
    }
    footerDirectiveController.$inject = ['$scope'];
    function footerDirectiveController($scope) {
        var vm = this;
        vm.allResources = {};

        $scope.$watch('allResources', function (value) {
            if (value !== undefined) {
                vm.allResources = value;
            }
        }, false);
    }

})();
