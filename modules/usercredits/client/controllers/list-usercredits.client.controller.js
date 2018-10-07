(function () {
    'use strict';

    angular
        .module('usercredits')
        .controller('UsercreditsListController', UsercreditsListController);

    UsercreditsListController.$inject = ['UsercreditsService'];

    function UsercreditsListController(UsercreditsService) {
        var vm = this;

        vm.usercredits = UsercreditsService.query();

        vm.verify = verify;

        // Remove existing Record
        function verify(usercreditId) {

            UsercreditsService.verify({usercreditId:usercreditId._id});
            usercreditId.status=true;

        }
    }
}());
