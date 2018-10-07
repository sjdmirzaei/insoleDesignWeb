(function () {
  'use strict';

  // Priceplans controller
  angular
    .module('priceplans')
    .controller('PriceplansController', PriceplansController);

  PriceplansController.$inject = ['$scope', '$state', '$window', 'Authentication', 'priceplanResolve'];

  function PriceplansController ($scope, $state, $window, Authentication, priceplan) {
    var vm = this;

    vm.authentication = Authentication;
    vm.priceplan = priceplan;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Priceplan
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.priceplan.$remove($state.go('priceplans.list'));
      }
    }

    // Save Priceplan
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.priceplanForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.priceplan._id) {
        vm.priceplan.$update(successCallback, errorCallback);
      } else {
        vm.priceplan.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('priceplans.list', {
          priceplanId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
