(function () {
    'use strict';
    angular
        .module('app')
        .service('tireService', tireService);

    tireService.$inject = ['$http', '$state'];

    function tireService($http) {
        var service = {
            getTires: getTires,
            getTireByCar: getTireByCar,
            getTireById: getTireById
        };

        return service;

        //////////////////////
        function getTires(){
            return $http.get('api/Tire/').then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function getTireById(id) {
            return $http.get('api/Tire/' + id).then(successCallBack, errorCallBack);
            function successCallBack(response) {
                return response;
            }
            function errorCallBack(response) {
                return response;
            }
        }

        function getTireByCar(year, tradeMark, model) {
            return $http.get('api/Tire/GetTireByCar/' + year + '/' + tradeMark + '/' + model)
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
