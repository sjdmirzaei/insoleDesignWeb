(function () {
    'use strict';

    angular
        .module('priceplans')
        .controller('PriceplansListController', PriceplansListController);

    PriceplansListController.$inject = ['PriceplansService','$window','$state'];

    function PriceplansListController(PriceplansService,$window,$state) {
        var vm = this;

        vm.priceplans = PriceplansService.query({type: 'my'});
        vm.error = null;
        vm.remove = remove;


        // Remove existing Priceplan
        function remove(p) {

            if ($window.confirm('Are you sure you want to delete?')) {
                var priceplan=new PriceplansService(p);
                priceplan.$remove(function () {
                    vm.priceplans = PriceplansService.query({type: 'my'});
                });
            }
        }
    }
}());
