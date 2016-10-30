(function () {
    'use strict';
    angular
        .module('app')
        .service('batteryService', batteryService);

    batteryService.$inject = ['$http', '$state'];

    function batteryService($http) {
        var service = {
            getListBattery: getListBattery,
            geBatteryById: geBatteryById,
            editBattery: editBattery,
            addBattery: addBattery,
            deleteBattery: deleteBattery,
            addBatteryToCar: addBatteryToCar,
            removeBatteryFromCar: removeBatteryFromCar,
            getBatteryByCar: getBatteryByCar
        };

        return service;

        //////////////////////

        function getListBattery() {
            return $http.get('api/Battery/')
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function geBatteryById(id) {
            return $http.get('api/Battery/' + id)
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function editBattery(editedObject) {

            return $http.put('api/Battery/' + editedObject.id, editedObject)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }

        function addBattery(addedObject) {
            return $http.post('api/battery/', addedObject)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }
        function deleteBattery(id) {
            return $http.delete('api/battery/' + id)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                return response;
            }
        }
        function addBatteryToCar(batteryId, carId) {
            return $http.post('api/battery/addBatteryToCar/' + batteryId + '/' + carId)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {

                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function removeBatteryFromCar(batteryId, carId) {
            return $http.post('api/Battery/RemoveBatteryToCar/' + batteryId + '/' + carId)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {

                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function getBatteryByCar(year, tradeMark, model) {
            return $http.get('api/Battery/GetBatteryByCar/' + year + '/' + tradeMark + '/' + model)
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        ////////////


    };
})();
