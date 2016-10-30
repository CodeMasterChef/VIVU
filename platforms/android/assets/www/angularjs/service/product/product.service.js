(function () {
    'use strict';

    angular
        .module('app')
        .service('productService', productService);

    productService.$inject = ['$http'];

    function productService($http) {
        var service = {
            getProductById: getProductById
        };
        return service;

        ////////////////

        function getProductById(id, type) {
            return $http.get('api/' + type + '/' + id, successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }
    }
})();