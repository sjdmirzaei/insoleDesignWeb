(function () {
  'use strict';

  // Gcodeplans controller
  angular
    .module('gcodeplans')
    .controller('GcodeplansController', GcodeplansController);

  GcodeplansController.$inject = ['$scope', '$state', '$window', 'Authentication', 'gcodeplanResolve'];

  function GcodeplansController ($scope, $state, $window, Authentication, gcodeplan) {
    var vm = this;

    vm.authentication = Authentication;
    vm.gcodeplan = gcodeplan;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Gcodeplan
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.gcodeplan.$remove($state.go('gcodeplans.list'));
      }
    }

    // Save Gcodeplan
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.gcodeplanForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.gcodeplan._id) {
        vm.gcodeplan.$update(successCallback, errorCallback);
      } else {
        vm.gcodeplan.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('gcodeplans.view', {
          gcodeplanId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
