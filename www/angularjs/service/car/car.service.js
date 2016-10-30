(function () {
    'use strict';
    angular
        .module('app')
        .service('carService', carService);

    carService.$inject = ['$http', '$state'];

    function carService($http) {
        var service = {
            getListCar: getListCar,
            editCar: editCar,
            addCar: addCar,
            deleteCar: deleteCar,
            getRelativeObject: getRelativeObject,
            getNotRelativeObject: getNotRelativeObject
        };

        return service;

        //////////////////////

        function getListCar() {
            return $http.get('api/Car/')
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function editCar(editedObject) {
          
            return $http.put('api/Car/' + editedObject.id, editedObject)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }

        function addCar(addedObject) {
            return $http.post('api/car/', addedObject)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }
        function deleteCar(id) {
            return $http.delete('api/car/' + id)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;

            }

            function errorCallBack(response) {
                return response;
            }
        }
       

      
        function getRelativeObject(url) {
            return $http.get(url)
                .then(successCallBack, errorCallBack);

            function successCallBack(response) {

                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function getNotRelativeObject(url) {
            return $http.get(url).then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }


    };
})();