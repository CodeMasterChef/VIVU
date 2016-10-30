(function () {
    'use strict';
    angular
        .module('app')
        .service('carService', carService);
    carService.$inject = ['$http'];
    function carService($http) {
        var service = {
            getCarTrademarkList: getCarTrademarkList,
            getCarModelList: getCarModelList,
            addCarToUser: addCarToUser,
            getCarsByUser: getCarsByUser,
            getRelativeTire: getRelativeTire,
            getRelativeOil: getRelativeOil,
            getRelativeBattery: getRelativeBattery,
            getRelativeWheel: getRelativeWheel,
            getCarByTrademarkAndModel: getCarByTrademarkAndModel
        };
        return service;
        /////////////
        function getCarTrademarkList() {

            return $http.get('api/car/trademark').then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }

        }
        function getCarModelList(trademark) {
            return $http.get('api/car/model/' + trademark).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function addCarToUser(trademark, model) {
            var data = {
                trademark: trademark,
                model: model
            };
            return $http.post('api/car/addCarToUser', data).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getCarsByUser() {
            return $http.get('api/car/getCarsByUser').then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getRelativeTire(carId) {
            return $http.get('api/car/relativeTire/' + carId).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getRelativeOil(carId) {
            return $http.get('api/car/relativeOil/' + carId).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getRelativeBattery(carId) {
            return $http.get('api/car/relativeBattery/' + carId).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getRelativeWheel(carId) {
            return $http.get('api/car/relativeWheel/' + carId).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getCarByTrademarkAndModel(trademark, model) {
            return $http.get('api/car/GetCarByTrademarkAndModel/' + trademark + '/' + model).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
    }
})();
