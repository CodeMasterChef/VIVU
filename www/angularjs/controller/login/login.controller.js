(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authenticationService', '$rootScope', '$localStorage', '$state', 'toastr'];

    function LoginController(authenticationService, $rootScope, $localStorage, $state, toastr) {
        var vm = this;
        vm.username = 'manager';
        vm.password = 'Ninh12345@';
        vm.login = login;
        vm.error = {};
        function login() {
            vm.error = {};
            if (vm.username === null) {
                vm.error.username = 'Tài khoản không được để trống.';
            }
            if (vm.password === null) {
                vm.error.password = 'Mật khẩu không được để trống.';
            }
            if (vm.username != null && vm.password != null) {
                authenticationService.getToken(vm.username, vm.password).then(function (response) {
                    if (response.status === 200) {
                        $localStorage.token = response.data;
                        authenticationService.getClaims().then(function (claimsResponse) {
                            $state.go('home.menu');
                        });
                    } else if (response.status === 400) {
                        vm.error.result = 'Tài khoản hoặc mật khẩu không đúng.';
                    }
                });
            }
        }
    }


})();
