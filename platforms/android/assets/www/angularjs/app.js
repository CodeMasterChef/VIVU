(function () {
    angular.module('app', [
        'ui.router',
        'ngStorage',
        'ngTasty',
        'toastr',
        'ngMaterial',
        'angular-loading-bar'
    ])
        .run(init);

    init.$inject = [];

    function init() {
    }
})();

