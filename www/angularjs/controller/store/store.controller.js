(function () {
    'use strict';
    angular
        .module('app')
        .controller('StoreController', StoreController);

    StoreController.$inject = [];

    function StoreController() {

        var vm = this;
        init();

        function init() {
            initializeMaps();
            vm.name = "Thanh Tam Auto";
            vm.address = "1 Lê Duẩn, Q1, TP HCM";
            vm.phoneNumber = "0123456789";
        }

        function initializeMaps() {
            var myCenter = new google.maps.LatLng(10.8230989, 106.6296638);
            var mapProp = {
                center: myCenter,
                zoom: 12,
                panControl: false,
                mapTypeControl: true,
                streetViewControl: false,
                draggable: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("googleMapStore"), mapProp);

            var marker = new google.maps.Marker({
                position: myCenter,
            });

            marker.setMap(map);
        }


    }
})();