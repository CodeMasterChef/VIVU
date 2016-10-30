(function () {
    'use strict';
    angular
        .module('app')
        .service('serviceService', serviceService);
    serviceService.$inject = ['$http'];
    function serviceService($http) {
        var service = {
            getServiceList: getServiceList
        };
        return service;
        /////////////
        function getServiceList() {
            return $http.get('api/service').then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(response) {
                return response;
            }

        }
    }
})();
