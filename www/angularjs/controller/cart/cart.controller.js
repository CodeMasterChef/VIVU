(function () {
    'use strict';
    angular
        .module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['$rootScope', '$scope', '$localStorage', 'productService', 'unknownOrderService', '$state', 'toastr', 'productTypeService'];

    function CartController($rootScope, $scope, $localStorage, productService, unknownOrderService, $state, toastr, productTypeService) {

        var vm = this;
        vm.resources = [];
        vm.navBarDrirectiveData = {};
        vm.navBarDrirectiveData.amount = 0;
        vm.totalPrice = 0;
        // error message
        vm.error = {};
        // parameter for create new unknown order
        vm.createdUnknownOrder = {
            fullName: '',
            mobile: '',
            shipAddress: ''
        };
        //////
        vm.saveAmountToLocalStorage = saveAmountToLocalStorage;
        vm.calculateTotalPrice = calculateTotalPrice;
        vm.removeProduct = removeProduct;
        vm.validateNumberOnly = validateNumberOnly;
        vm.goBackBeforePage = goBackBeforePage;
        vm.createNewUnknownOrder = createNewUnknownOrder;
        init();

        function init() {
            getData();
            vm.createdUnknownOrder = { 'fullName': 'Le Van Ninh', 'mobile': '0123456789', 'shipAddress': '182 Le Dai Hanh Q11 TP HCM' };

        }

        function getData() {
            vm.resources = [];
            var productList = $localStorage.products;
            vm.navBarDrirectiveData.amount = 0;
            if (productList !== undefined) {
                productList.forEach(function (element) {
                    productTypeService.getProductTypeById(element.productTypeId).then(function (response) {
                        var productTypeName = response.data.name;
                        if (productTypeName !== undefined) {
                            productService.getProductById(element.id, productTypeName).then(function (response) {
                                var product = response.data;
                                product.productTypeId = element.productTypeId;
                                product.amount = element.amount;
                                vm.resources.push(product);
                                vm.totalPrice = vm.totalPrice + product.price * product.amount;
                                // count the amount of product
                                vm.navBarDrirectiveData.amount += Number(product.amount);
                            });
                        }
                    });

                }, this);
            }

        }

        function calculateTotalPrice() {
            if (vm.resources !== []) {
                vm.totalPrice = 0;
                var totalAmount = 0;
                vm.navBarDrirectiveData.amount = 0;
                if (vm.resources !== undefined) {
                    for (var i = 0; i < vm.resources.length; i++) {
                        vm.totalPrice += vm.resources[i].price * vm.resources[i].amount;
                        totalAmount += Number(vm.resources[i].amount);
                    }
                    $rootScope.totalAmount = totalAmount;
                }

            }
        }

        function validateNumberOnly(amount) {

        }

        function saveAmountToLocalStorage(productId, productTypeId, amount) {
            var productList = $localStorage.products;
            if (productList !== undefined) {
                for (var i = 0; i < productList.length; i++) {
                    if (productList[i].id === productId && productList[i].productTypeId === productTypeId) {
                        productList[i].amount = amount;
                    }
                }
                $localStorage.products = productList;
            }
        }

        function removeProduct(productId, productTypeId) {
            if ($localStorage.products !== undefined) {
                $localStorage.products.forEach(function loop(element, index) {
                    if (element.id === productId && element.productTypeId === productTypeId) {
                        $localStorage.products.splice(index, 1);
                        loop.stop = true;
                        // get updated list of product
                        getData();
                        // caculate total price again
                        calculateTotalPrice();
                    }
                }, this);
            }
        }
        function goBackBeforePage() {
            if ($localStorage.stateBeforeGoCarPage === undefined) {
                $state.go('home.accessory');
            } else {
                $state.go($localStorage.stateBeforeGoCarPage);
            }
        }

        function createNewUnknownOrder() {
            vm.error = {};
            var isValid = true;
            if (vm.createdUnknownOrder.fullName === '') {
                vm.error.fullName = 'Họ tên không được bỏ trống';
                isValid = false;

            }
            if (vm.createdUnknownOrder.mobile === '') {
                vm.error.mobile = 'Số điện thoại không được bỏ trống';
                isValid = false;

            }
            if (vm.createdUnknownOrder.shipAddress === '') {
                vm.error.shipAddress = 'Địa chỉ giao hàng không được bỏ trống';
                isValid = false;
            }
            if (isValid) {
                var unknownOrderProductList = [];
                for (var i = 0; i < vm.resources.length; i++) {
                    var resource = vm.resources[i];
                    var unknownOrderProduct = {
                        'productId': resource.id,
                        'productTypeId': resource.productTypeId,
                        'amount': resource.amount
                    };
                    unknownOrderProductList.push(unknownOrderProduct);
                }
                var data = {
                    'fullName': vm.createdUnknownOrder.fullName,
                    'mobile': vm.createdUnknownOrder.mobile,
                    'shipAddress': vm.createdUnknownOrder.shipAddress,
                    'unknownOrderProduct': unknownOrderProductList
                }
                unknownOrderService.createNewUnknownOrder(data).then(
                    function (response) {
                        if (response.status === 200) {
                            toastr.success('Đặt hàng thành công');
                            $state.go('orderSuccess');
                        } else {
                            toastr.error('Đã xảy ra lỗi. Không thể đặt hàng');
                        }
                    },
                    function (response) {
                        toastr.error('Đã xảy ra lỗi. Không thể đặt hàng');
                    }
                )


                console.info(vm.resources);
            }


        }


    }
})();