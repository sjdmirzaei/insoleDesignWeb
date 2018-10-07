(function () {
  'use strict';

  angular
    .module('creditplans')
    .controller('CreditplansListController', CreditplansListController);

  CreditplansListController.$inject = ['CreditplansService'];

  function CreditplansListController(CreditplansService) {
    var vm = this;

    vm.creditplans = CreditplansService.query();
  }
}());
