(function () {
    'use strict';
    angular
        .module('app')
        .directive('searchDirective', searchDirective);

    function searchDirective() {
        // Usage: ...
        var directive = {
            restrict: 'AE',
            templateUrl: 'angularjs/directive/search/search.html',
            scope: {
                car: '=',
                getRelativeObjectUrl: '=',
                getNotRelativeObjectUrl: '=',
                relativeObjectType: '=',
                header: '='
            },
            link: link,
            controller: searchController,
            controllerAs: 'vm'
        };
        return directive;

        ////////////////////////////
        function link() {
        }
    }
    searchController.$inject = ['$scope', '$http', '$state', 'carService', 'tireService', 'oilService', 'wheelService', 'batteryService', '$rootScope', '$anchorScroll', '$location', 'toastr'];

    function searchController($scope, $http, $state, carService, tireService, oilService, wheelService, batteryService, $rootScope, $anchorScroll, $location, toastr) {
        var vm = this;

        vm.inputCar = '';
        vm.selectedYear = '';
        vm.selectedTradeMark = '';
        vm.selectedModel = '';
        vm.emptyValueError = '';
        vm.yearList = [];
        vm.tradeMarkList = [];
        vm.modelList = [];
        vm.allResourcesForTire = {
            'data': [],
            'title': [],
            'canNotFindMessage': '',
            'heading': ''
        };
        vm.allResourcesForOil = {
            'data': [],
            'title': [],
            'canNotFindMessage': '',
            'heading': ''
        };
        vm.allResourcesForWheel = {
            'data': [],
            'title': [],
            'canNotFindMessage': '',
            'heading': ''
        };
        vm.allResourcesForBattery = {
            'data': [],
            'title': [],
            'canNotFindMessage': '',
            'heading': ''
        };

        // function here
        vm.getRelativeInformation = getRelativeInformation;
        vm.resetTradeMarkAndModel = resetTradeMarkAndModel;
        vm.resetModel = resetModel;
        init();

        function init() {
            getCars();


        }

        $scope.$watch('vm.allResourcesForTire', function (value) {
            if (value !== undefined) {
                $rootScope.allResourcesForTire = vm.allResourcesForTire;
            }
        }, false);
        $scope.$watch('vm.allResourcesForOil', function (value) {
            if (value !== undefined) {
                $rootScope.allResourcesForOil = vm.allResourcesForOil;
            }
        }, false);
        $scope.$watch('vm.allResourcesForWheel', function (value) {
            if (value !== undefined) {
                $rootScope.allResourcesForWheel = vm.allResourcesForWheel;
            }
        }, false);
        $scope.$watch('vm.allResourcesForBattery', function (value) {
            if (value !== undefined) {
                $rootScope.allResourcesForBattery = vm.allResourcesForBattery;
            }
        }, false);

        function getCars() {
            carService.getListCar().then(function (response) {
                vm.carList = response.data;
                getYearList();

                if ($rootScope.searchedCar !== undefined) {
                    vm.selectedYear = $rootScope.searchedCar.year;
                    vm.selectedTradeMark = $rootScope.searchedCar.tradeMark;
                    vm.selectedModel = $rootScope.searchedCar.model;
                    getRelativeInformation();
                }
            });

        }

        $scope.$watch('vm.selectedYear', function (value) {
            if (value !== undefined) {
                getTradeMarkList();
            }
        });
        $scope.$watch('vm.selectedTradeMark', function (value) {
            if (value !== undefined) {
                getModelList(vm.selectedYear, vm.selectedTradeMark);
            }
        });

        function resetTradeMarkAndModel() {
            vm.selectedTradeMark = '';
            vm.selectedModel = '';
        }
        function resetModel() {
            vm.selectedModel = '';
        }

        function getYearList() {
            vm.yearList = [];
            vm.carList.forEach(function (element) {
                var year = element['productionDate'].substring(0, 4);
                if (!vm.yearList.includes(year)) {
                    vm.yearList.push(year);
                }
            }, this);
            vm.yearList.sort();

        }
        function getTradeMarkList() {
            if (vm.selectedYear !== undefined && vm.carList !== undefined) {
                vm.tradeMarkList = [];
                vm.carList.forEach(function (element) {
                    var tradeMark = element['trademark'];
                    var productionYear = element['productionDate'].substring(0, 4);
                    if (productionYear === vm.selectedYear && !vm.tradeMarkList.includes(tradeMark)) {
                        vm.tradeMarkList.push(tradeMark);
                    }
                }, this);
                vm.tradeMarkList.sort();


            }
        }

        function getModelList(year, inputTradeMark) {
            vm.modelList = [];
            if (vm.carList !== undefined) {
                vm.carList.forEach(function (element) {
                    var model = element['model'];
                    var productionYear = element['productionDate'].substring(0, 4);
                    var tradeMark = element['trademark'];
                    if (productionYear === year && tradeMark === inputTradeMark && !vm.modelList.includes(model)) {
                        vm.modelList.push(model);
                    }
                }, this);
                vm.modelList.sort();
            }



        }
        function getRelativeInformation() {
            // check empty value
            if (vm.selectedYear === '' || vm.selectedTradeMark === '' || vm.selectedModel === '') {
                if (vm.selectedYear === '') {
                    vm.emptyValueError = 'Chưa chọn thông tin Năm sản xuất';
                } else if (vm.selectedTradeMark === '') {
                    vm.emptyValueError = 'Chưa chọn thông tin Thương hiệu';
                } else if (vm.selectedModel === '') {
                    vm.emptyValueError = 'Chưa chọn thông tin Dòng xe';
                }
            } else {
                vm.emptyValueError = '';
                $rootScope.searchedCar = {
                    'year': vm.selectedYear,
                    'model': vm.selectedModel,
                    'tradeMark': vm.selectedTradeMark
                }
                getTireByCar();
                getOilByCar();
                getWheelByCar();
                getBatteryByCar();
                // scroll to div id=search-result
                $location.hash('search-result');
                $anchorScroll();
            }


        }
        function getTireByCar() {
            vm.allResourcesForTire = {
                'title': {
                    'trademark': 'Thương hiệu',
                    'name': 'Dòng sản phẩm',
                    'origin': 'Xuất xứ',
                    'weight': 'Size lốp',
                    'treadPattern': 'Mẫu gai',
                    'indices': 'Chỉ số trọng tải/tốc độ',
                    'structure': 'Tính năng',
                    'roadCondition': 'Địa hình',
                    'position': 'Vị trí',
                    'price': 'Giá'
                },
                'data': [],
                'canNotFindMessage': '',
                'heading': 'Vỏ xe phù hợp'
            };

            tireService.getTireByCar(vm.selectedYear, vm.selectedTradeMark, vm.selectedModel).then(function (response) {
                if (response.data.status === 'NotEmpty') {
                    var tireList = response.data.data;
                    vm.allResourcesForTire.data = [];
                    var tempTire = {};
                    tireList.forEach(function (tire) {
                        tempTire = angular.copy(tire);
                        for (var property in tire) {
                            if (property === 'position') {
                                tempTire[property] = (tire[property] === 'front') ? 'Bánh trước' : 'Bánh sau';
                            }
                        }
                        vm.allResourcesForTire.data.push(tempTire);
                    }, this);
                } else {
                    vm.allResourcesForTire.canNotFindMessage = 'Không tìm thông tin vỏ xe liên quan đến xe của bạn. Chúng tôi sẽ nhanh chống cập nhật.';
                }

            });
        }

        function getOilByCar() {
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
                'data': [],
                'canNotFindMessage': '',
                'heading': 'Dầu nhớt phù hợp'
            };

            oilService.getOilByCar(vm.selectedYear, vm.selectedTradeMark, vm.selectedModel).then(function (response) {
                if (response.data.status === 'NotEmpty') {
                    var oilList = response.data.data;
                    vm.allResourcesForOil.data = oilList;
                } else {
                    vm.allResourcesForOil.canNotFindMessage = 'Không tìm thông tin dầu nhớt liên quan đến xe của bạn. Chúng tôi sẽ nhanh chống cập nhật.';

                }

            });
        }


        function getWheelByCar() {
            vm.allResourcesForWheel = {
                'title': {
                    'size': 'Kích thước',
                    'hole': 'Số lỗ',
                    'price': 'Giá'
                },
                'data': [],
                'canNotFindMessage': '',
                'heading': 'Mâm xe phù hợp'
            };

            wheelService.getWheelByCar(vm.selectedYear, vm.selectedTradeMark, vm.selectedModel).then(function (response) {
                if (response.data.status === 'NotEmpty') {
                    var wheelList = response.data.data;
                    vm.allResourcesForWheel.data = wheelList;
                } else {
                    vm.allResourcesForWheel.canNotFindMessage = 'Không tìm thông tin mâm xe liên quan đến xe của bạn. Chúng tôi sẽ nhanh chống cập nhật.';
                }

            });
        }


        function getBatteryByCar() {
            vm.allResourcesForBattery = {
                'title': {
                    'name': 'Thương hiệu',
                    'capacity': 'Quy cách',
                    'type': 'Loại',
                    'dimension': 'Kích thước',
                    'price': 'Giá'
                },
                'data': [],
                'canNotFindMessage': '',
                'heading': 'Ắc quy phù hợp'
            };

            batteryService.getBatteryByCar(vm.selectedYear, vm.selectedTradeMark, vm.selectedModel).then(function (response) {
                if (response.data.status === 'NotEmpty') {
                    var batteryList = response.data.data;
                    vm.allResourcesForBattery.data = batteryList;
                } else {
                    vm.allResourcesForBattery.canNotFindMessage = 'Không tìm thông tin ắc quy liên quan đến xe của bạn. Chúng tôi sẽ nhanh chống cập nhật.';
                }

            });
        }
    }

})();
