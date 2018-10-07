(function () {
  'use strict';

  angular
    .module('softwareupdates')
    .controller('SoftwareupdatesListController', SoftwareupdatesListController);

  SoftwareupdatesListController.$inject = ['SoftwareupdatesService','$window','$state'];

  function SoftwareupdatesListController(SoftwareupdatesService,$window,$state) {
    var vm = this;

    vm.softwareupdates = SoftwareupdatesService.query();
      vm.remove = remove;
      // Remove existing Softwareupdate
      function remove(softwareupdate) {
          if ($window.confirm('Are you sure you want to delete?')) {
              softwareupdate.$remove($state.go('softwareupdates.list'));
          }
      }
  }
}());
