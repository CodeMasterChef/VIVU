(function () {
    'use strict';
    angular
        .module('app')
        .service('authenticationService', authenticationService);
    authenticationService.$inject = ['$rootScope', '$http', '$localStorage', '$httpParamSerializerJQLike', '$state', '$timeout', '$q', '$location'];
    function authenticationService($rootScope, $http, $localStorage, $httpParamSerializerJQLike, $state, $timeout, $q, $) {
        var service = {
            getToken: getToken,
            getClaims: getClaims,
            getRoleAndUserName: getRoleAndUserName,
            checkMultiRole: checkMultiRole,
            changePassword: changePassword,
            sendResetPasswordToken: sendResetPasswordToken,
            updatePassword: updatePassword,
            checkLogin: checkLogin
        };
        return service;
        ////////////////////////////

        function getToken(username, password) {
            var data = {
                username: username,
                password: password,
                grant_type: 'password'
            };
            return $http.post('token', $httpParamSerializerJQLike(data)).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(error) {
                return error;
            }
        }
        function getClaims() {
            return $http.get('api/claims/').then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(error) {
                $state.go('login');
                return error;
            }
        }

        function checkLogin() {
            var deferred = $q.defer();

            if (!$localStorage.token) {
                $timeout(function () {
                    $state.go('login');
                }, 0);
                deferred.reject();
            } else {
                $http.get('api/claims/').then(function (response) {
                    if (response.status === 200) {
                        for (var i = 0; i < response.data.length; i++) {
                            if (response.data[i].type.endsWith('nameidentifier')) {
                                $rootScope.userId = response.data[i].value;
                                break;
                            }
                        }
                        deferred.resolve();

                    } else {
                        $timeout(function () {
                            $state.go('login');
                        }, 0);
                        deferred.reject();
                    }
                });
            }
            return deferred.promise;
        }

        function changePassword(data) {
            return $http.post('api/Account/Password/ChangePassword', data).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(error) {
                return error;
            }
        }

        function getRoleAndUserName() {
            if ($localStorage.token !== undefined) {
                var config = {};
                var accessToken = $localStorage.token.token_type + ' ' + $localStorage.token.access_token;
                config.headers = { 'Authorization': accessToken };
                return $http.get('api/claims/', config).then(successCallback, errorCallback);

            }
            function successCallback(response) {
                var role = '';
                var username = '';
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].type.endsWith('role')) {
                        role = response.data[i].value;
                    }
                    if (response.data[i].type.endsWith('name')) {
                        username = response.data[i].value;
                    }
                }
                return { 'role': role, 'username': username };
            }
            function errorCallback(error) {
                return error;
            }
        }

        function checkMultiRole(validRoleList) {
            if ($localStorage.token) {
                $http.get('api/claims/').then(function (response) {
                    if (response.status === 200) {
                        var role = '';
                        for (var i = 0; i < response.data.length; i++) {
                            if (response.data[i].type.endsWith('role')) {
                                role = response.data[i].value;
                            }
                        }
                        var isValid = false;
                        for (i = 0; i < validRoleList.length; i++) {
                            if (role === validRoleList[i]) {
                                isValid = true;
                            }
                        }
                        if (!isValid) {
                            $state.go('start.authorizeError');
                        }
                    } else {
                        $state.go('login');
                    }
                });
            } else {
                $state.go('login');
            }
        }

        function sendResetPasswordToken(username, callbackUrl) {
            var data = {
                'userName': username,
                'resetUrl': callbackUrl
            };
            return $http.post('api/Account/Password/ForgetPassword', data).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(error) {
                return error;
            }
        }

        function updatePassword(username, code, newPassword, confirmPassword) {
            var data = {
                'userName': username,
                'code': code,
                'newPassword': newPassword,
                'confirmPassword': confirmPassword
            };
            return $http.put('api/Account/Password/UpdatePassword', data).then(successCallback, errorCallback);
            function successCallback(response) {
                return response;
            }
            function errorCallback(error) {
                return error;
            }
        }

    }
})();