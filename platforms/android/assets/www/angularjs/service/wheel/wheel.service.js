(function () {
    'use strict';
    angular
        .module('app')
        .service('wheelService', wheelService);

    wheelService.$inject = ['$http', '$state'];

    function wheelService($http) {
        var service = {

            getListWheel: getListWheel,
            getWheelById: getWheelById,
            editWheel: editWheel,
            addWheel: addWheel,
            deleteWheel: deleteWheel,
            addWheelToCar: addWheelToCar,
            removeWheelFromCar: removeWheelFromCar,
            getWheelByCar: getWheelByCar
        };

        return service;

        //////////////////////

        function getListWheel() {
            return $http.get('api/Wheel/')
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function getWheelById(id) {
            return $http.get('api/Wheel/' + id)
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function editWheel(editedObject) {

            return $http.put('api/Wheel/' + editedObject.id, editedObject)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }

        function addWheel(addedObject) {
            return $http.post('api/wheel/', addedObject)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }
        function deleteWheel(id) {
            return $http.delete('api/wheel/' + id)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                return response;
            }
        }
        function addWheelToCar(wheelId, carId) {
            return $http.post('api/wheel/addWheelToCar/' + wheelId + '/' + carId)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {

                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function removeWheelFromCar(wheelId, carId) {
            return $http.post('api/Wheel/RemoveWheelToCar/' + wheelId + '/' + carId)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {

                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function getWheelByCar(year, tradeMark, model) {
            return $http.get('api/Wheel/GetWheelByCar/' + year + '/' + tradeMark + '/' + model)
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
