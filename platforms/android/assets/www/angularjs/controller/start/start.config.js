(function () {
    angular
        .module('app')
        .config(config)
        .factory('httpInterceptor', httpInterceptor);

    config.$inject = ['$httpProvider', '$urlRouterProvider', '$stateProvider'];
    /* @ngInject */

    function config($httpProvider, $urlRouterProvider, $stateProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('start', {
            url: '/',
            templateUrl: 'angularjs/controller/start/start.html',
            controller: 'CoreController',
            controllerAs: 'vm',
            resolve: {
            }
        });
    }
    httpInterceptor.$inject = ['$q', '$location', '$localStorage', '$rootScope'];
    function httpInterceptor($q, $location, $localStorage) {
        return {
            request: function (_config) {
                if (_config.url.indexOf('.html') === -1 && _config.url.indexOf('http') === -1) {
                   //  _config.url = 'http://localhost:46773/' + _config.url;
                    _config.url = 'http://carmaintenanceapi.azurewebsites.net/' + _config.url;

                }
                // if ($localStorage.token) {
                //     _config.headers.authorization = $localStorage.token.token_type + ' ' + $localStorage.token.access_token;
                // }
                return _config;
            },
            responseError: function (rejection) {
                // if (rejection.status === 401 || rejection.status === 403 || rejection.status === 419) {
                //     delete $localStorage.token;
                //     delete $localStorage.role;
                //     $location.path('/login');
                //     return $q.reject(rejection);
                // } else {
                //     return $q.reject(rejection);
                // }
            }
        };
    }
})();
