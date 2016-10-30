(function () {
    'use strict';
    angular
        .module('app')
        .service('serviceService', serviceService);
    serviceService.$inject = ['$http', '$state'];
    function serviceService($http) {
        var service = {
            getListService: getListService,
            getServiceById: getServiceById,
            editService: editService,
            addService: addService,
            deleteService: deleteService
        };
        return service;
        function getListService() {
            return $http.get('api/Service/')
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function getServiceById(id) {
            return $http.get('api/Service/' + id)
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function editService(editedObject) {
            return $http.put('api/Service/' + editedObject.id, editedObject)
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function addService(addedObject) {
            return $http.post('api/service/', addedObject)
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
        function deleteService(id) {
            return $http.delete('api/service/' + id)
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
    }
})();
