(function () {
    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = [ '$rootScope', '$scope', '$timeout', '$mdSidenav', 'authenticationService', '$state', '$localStorage', '$location'];

    function homeController($rootScope, $scope, $timeout, $mdSidenav, authenticationService, $state, $localStorage, $location) {

        authenticationService.checkLogin();
        /////////
        var vm = this;
        vm.totalAmount = 0;
        vm.loadCartPage = loadCartPage;
        vm.loadHomePage = loadHomePage;
        vm.loadTotalAmount = loadTotalAmount;

        init();
        function init() {
            loadTotalAmount();
        }


        // left side bar
        vm.logout = logout;
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }
        function logout() {
            $timeout(delete $localStorage.token).then(function () {
                $state.go('login');
            });
        }
        function loadCartPage() {
            $state.go('home.cart');
        }
        function loadHomePage() {
            $state.go('home.menu');
        }
        function loadTotalAmount() {
            var products = $localStorage.products;
            var totalAmount = 0;
            if (products !== undefined) {
                for (var i = 0; i < products.length; i++) {
                    totalAmount += products[i].amount;
                }
            }
            $rootScope.totalAmount = totalAmount;
        }
    }
})();
