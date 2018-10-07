(function () {
    'use strict';

    angular
        .module('orders')
        .controller('OrdersListController', OrdersListController);

    OrdersListController.$inject = ['OrdersService', 'Authentication'];

    function OrdersListController(OrdersService, Authentication) {
        var vm = this;
        vm.authentication = Authentication;
        vm.pageChange = pageChange;
        vm.nextPage = nextPage;
        //vm.page = 0;
        // vm.datepickerConfig = {
        //     allowFuture: false,
        //     dateFormat: 'jYYYY/jMM/jDD',
        //     gregorianDateFormat: 'YYYY/DD/MM',
        //     //minDate: moment.utc('2008', 'YYYY')
        // };
        vm.filter={fromDate:moment().subtract(10, "days").toISOString(),toDate:moment().toISOString(),sid:'',patientName:'',page:0};

        OrdersService.query(vm.filter).$promise.then(function (data) {
            vm.pagedItems = data[0];
            vm.totalCount = data[1];
            vm.perPage = data[2];
            vm.pages = Math.ceil(vm.totalCount / vm.perPage);
            //  vm.buildPager();
        });
        function nextPage(page) {
            if ((vm.filter.page + page) >= 0 && (vm.filter.page + page) < vm.pages) {
                vm.filter.page = vm.filter.page + page;
                vm.pageChange(vm.filter.page);
            } else {
            }
        }

        function pageChange(page) {
            vm.filter.page = page;
            OrdersService.query(vm.filter).$promise.then(function (data) {
                vm.pagedItems = data[0];
                vm.totalCount = data[1];
                vm.perPage = data[2];
                vm.pages = Math.ceil(vm.totalCount / vm.perPage);
                //  vm.buildPager();
            });
        }

    }

}());
