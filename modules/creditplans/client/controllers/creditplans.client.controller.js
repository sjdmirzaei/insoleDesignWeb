(function () {
  'use strict';

  // Creditplans controller
  angular
    .module('creditplans')
    .controller('CreditplansController', CreditplansController);

  CreditplansController.$inject = ['$scope', '$state', '$window', 'Authentication', 'creditplanResolve'];

  function CreditplansController ($scope, $state, $window, Authentication, creditplan) {
    var vm = this;

    vm.authentication = Authentication;
    vm.creditplan = creditplan;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Creditplan
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.creditplan.$remove($state.go('creditplans.list'));
      }
    }

    // Save Creditplan
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.creditplanForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.creditplan._id) {
        vm.creditplan.$update(successCallback, errorCallback);
      } else {
        vm.creditplan.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('creditplans.view', {
          creditplanId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
