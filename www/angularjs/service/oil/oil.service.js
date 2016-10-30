(function () {
    'use strict';
    angular
        .module('app')
        .service('oilService', oilService);

    oilService.$inject = ['$http', '$state'];

    function oilService($http) {
        var service = {

            getListOil: getListOil,
            getOilById: getOilById,
            editOil: editOil,
            addOil: addOil,
            deleteOil: deleteOil,
            addOilToCar: addOilToCar,
            removeOilFromCar: removeOilFromCar,
            getOilByCar: getOilByCar
        };

        return service;

        //////////////////////

        function getListOil() {

            return $http.get('api/Oil/')
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }

        function getOilById(id) {
            return $http.get('api/Oil/' + id)
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function editOil(editedObject) {

            return $http.put('api/Oil/' + editedObject.id, editedObject)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }

        function addOil(addedObject) {
            return $http.post('api/oil/', addedObject)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }
        function deleteOil(id) {
            return $http.delete('api/oil/' + id)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                return response;
            }
        }
        function addOilToCar(oilId, carId) {
            return $http.post('api/oil/addOilToCar/' + oilId + '/' + carId)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {

                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function removeOilFromCar(oilId, carId) {
            return $http.post('api/oil/RemoveOilToCar/' + oilId + '/' + carId)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {

                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function getOilByCar(year, tradeMark, model) {
            return $http.get('api/Oil/GetOilByCar/' + year + '/' + tradeMark + '/' + model)
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
