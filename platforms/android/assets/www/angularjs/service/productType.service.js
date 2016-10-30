(function() {
    'use strict';

    angular
        .module('app')
        .service('productTypeService', productTypeService);

    productTypeService.$inject = ['$http'];

    function productTypeService($http) {
        var service = {
            getProductTypeById: getProductTypeById
        };
        return service;

        ////////////////

        function getProductTypeById(typeId) {
            return $http.get('api/productType/' + typeId, successCallBack, errorCallBack);

            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                return response;
            }
        }
    }
})();