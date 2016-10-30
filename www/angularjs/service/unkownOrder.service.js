(function () {
    'use strict';
    angular
        .module('app')
        .service('unknownOrderService', unknownOrderService);

    unknownOrderService.$inject = ['$http', '$state'];

    function unknownOrderService($http) {
        var service = {
            getAllUnknownOrder: getAllUnknownOrder,
            createNewUnknownOrder: createNewUnknownOrder
        };

        return service;

        //////////////////////
        function getAllUnknownOrder() {
            return $http.get('api/unknownOrder/')
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function createNewUnknownOrder(unknownOrder) {
            return $http.post('api/unknownOrder/', unknownOrder)
                .then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

    };
})();
