(function () {
  'use strict';

  angular
    .module('gcodeplans')
    .controller('GcodeplansListController', GcodeplansListController);

  GcodeplansListController.$inject = ['GcodeplansService'];

  function GcodeplansListController(GcodeplansService) {
    var vm = this;

    vm.gcodeplans = GcodeplansService.query();
  }
}());
