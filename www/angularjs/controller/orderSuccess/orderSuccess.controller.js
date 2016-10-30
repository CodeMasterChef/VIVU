(function () {
    'use strict';
    angular
        .module('app')
        .controller('OrderSuccessController', OrderSuccessController);

    OrderSuccessController.$inject = ['$scope', '$localStorage', 'toastr'];

    function OrderSuccessController($scope, $localStorage, toastr) {
        var vm = this;

    }
})();