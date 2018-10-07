(function () {
    'use strict';

    angular
        .module('gcodes')
        .controller('GcodesListController', GcodesListController);

    GcodesListController.$inject = ['GcodesService'];

    function GcodesListController(GcodesService) {
        var vm = this;
        vm.pageChange = pageChange;
        vm.nextPage = nextPage;
        vm.page = 0;

        vm.gcodes = GcodesService.query();
        GcodesService.query({page: 0}).$promise.then(function (data) {
            vm.pagedItems = data[0];
            vm.totalCount = data[1];
            vm.perPage = data[2];
            vm.pages = Math.ceil(vm.totalCount / vm.perPage);
            //  vm.buildPager();
        });
        function nextPage(page) {
            if ((vm.page + page) >= 0 && (vm.page + page) < vm.pages) {
                vm.page = vm.page + page;
                vm.pageChange(vm.page);
            } else {
            }
        }

        function pageChange(page) {
            vm.page = page;
            GcodesService.query({page: vm.page}).$promise.then(function (data) {
                vm.pagedItems = data[0];
                vm.totalCount = data[1];
                vm.perPage = data[2];
                vm.pages = Math.ceil(vm.totalCount / vm.perPage);
                //  vm.buildPager();
            });
        }
    }
}());
