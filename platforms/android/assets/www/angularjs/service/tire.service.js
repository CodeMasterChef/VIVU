(function () {
    'use strict';
    angular
        .module('app')
        .service('tireService', tireService);
    tireService.$inject = ['$http'];
    function tireService($http) {
        var service = {
            getTires:getTires,
            getTireTrademarkList: getTireTrademarkList,
            getTireModelList: getTireModelList,
            addTireToUser: addTireToUser,
            getTiresByUser: getTiresByUser,
            getRelativeTire: getRelativeTire,
            getRelativeOil: getRelativeOil,
            getRelativeBattery: getRelativeBattery,
            getRelativeWheel: getRelativeWheel,
            getTireByTrademarkAndModel: getTireByTrademarkAndModel
        };
        return service;
        /////////////
         function getTires() {

            return $http.get('api/tire/').then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }

        }
        function getTireTrademarkList() {

            return $http.get('api/tire/trademark').then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }

        }
        function getTireModelList(trademark) {
            return $http.get('api/tire/model/' + trademark).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function addTireToUser(trademark, model) {
            var data = {
                trademark: trademark,
                model: model
            };
            return $http.post('api/tire/addTireToUser', data).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getTiresByUser() {
            return $http.get('api/tire/getTiresByUser').then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getRelativeTire(tireId) {
            return $http.get('api/tire/relativeTire/' + tireId).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getRelativeOil(tireId) {
            return $http.get('api/tire/relativeOil/' + tireId).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getRelativeBattery(tireId) {
            return $http.get('api/tire/relativeBattery/' + tireId).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getRelativeWheel(tireId) {
            return $http.get('api/tire/relativeWheel/' + tireId).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
        function getTireByTrademarkAndModel(trademark, model) {
            return $http.get('api/tire/GetTireByTrademarkAndModel/' + trademark + '/' + model).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }
        }
    }
})();
