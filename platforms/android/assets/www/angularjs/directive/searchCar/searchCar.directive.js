(function () {
    'use strict';
    angular
        .module('app')
        .directive('searchCarDirective', searchCarDirective);

    function searchCarDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'angularjs/directive/searchCar/searchCar.directive.html',
            scope: {
                outputSelectedTrademark: '=',
                outputSelectedModel: '=',
                outputErrorSelectedTrademark: '=',
                outputErrorModel: '='
            },
            controller: searchCarDirectiveController,
            controllerAs: 'vm'
        };
    }
    searchCarDirectiveController.$inject = ['$scope', '$rootScope', '$localStorage', '$state', 'toastr', '$timeout', '$log', '$q', 'carService'];

    function searchCarDirectiveController($scope, $rootScope, $localStorage, $state, toastr, $timeout, $log, $q, carService) {
        var vm = this;

        vm.simulateQuery = false;
        vm.isDisabled = false;

        // variable for autocomplete car trademark
        vm.carTrademarkStates = [];
        vm.querySearch = querySearch;
        vm.selectedTrademarkChange = selectedTrademarkChange;
         vm.newState = newState;
        loadAllTrademark();

        // variable for autocomplete car model
        vm.carModelStates = [];
        vm.querySearchCarModel = querySearchCarModel;
        vm.selectedModelChange = selectedModelChange;
        // variable for button
        vm.mainButtonLabel = null;


        init();

        function init() {
        }


        function newState(state) {
            alert('Sorry! You will need to create a Constitution for ' + state + ' first!');
        }

        function querySearch(query) {
            if (vm.carTrademarkStates !== undefined) {
                var results = query ? vm.carTrademarkStates.filter(createFilterFor(query)) : vm.carTrademarkStates,
                    deferred;
                if (vm.simulateQuery) {
                    deferred = $q.defer();
                    $timeout(function () {
                        deferred.resolve(results);
                    }, Math.random() * 1000, false);
                    return deferred.promise;
                } else {
                    return results;
                }
            }

        }
        function querySearchCarModel(query) {
            var results = query ? vm.carModelStates.filter(createFilterFor(query)) : vm.carModelStates,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function selectedTrademarkChange(item) {
            if (item !== null) {
                $scope.outputSelectedTrademark = item.display;
                loadAllCarModel(item.display);
            }
        }


        function loadAllTrademark() {
            carService.getCarTrademarkList().then(function (response) {
                var allStates = response.data;
                var toLowerCasestates = allStates.map(function (state) {
                    return {
                        value: state.toLowerCase(),
                        display: state
                    };
                });
                vm.carTrademarkStates = toLowerCasestates;
            });


        }

        function loadAllCarModel(trademark) {
            carService.getCarModelList(trademark).then(function (response) {
                var allStates = response.data;
                var toLowerCasestates = allStates.map(function (state) {
                    return {
                        value: state.toLowerCase(),
                        display: state
                    };
                });
                vm.carModelStates = toLowerCasestates;
            });
        }

        function selectedModelChange(item) {
            if (item !== null) {
                $scope.outputSelectedModel = item.display;
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }

    }
})();
