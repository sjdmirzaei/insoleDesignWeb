(function () {
  'use strict';

  // Gcodes controller
  angular
    .module('gcodes')
    .controller('GcodesController', GcodesController);

  GcodesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'gcodeResolve','GcodesService','Notification'];

  function GcodesController ($scope, $state, $window, Authentication, gcode,GcodesService,Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.gcode = gcode;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
      vm.payGcode=payGcode;
    // Remove existing Gcode
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.gcode.$remove($state.go('gcodes.list'));
      }
    }

      function payGcode(gcodeId){

          GcodesService.payGcode({gcodeId: vm.gcode._id}).$promise.then(function (data) {
              vm.error = data.message;

              if (data.msgtype == 'error') {
                  Notification.error({message: vm.error});
                  $state.go('gcodes.list')
              } else {
                  Notification.success({message: "پرداخت با موفقیت انجام شد"});
                  Authentication.user.credit = data.newcredit;
                  Authentication.user.gcodePlan.totalorder = data.newGcodeNumber;
                  console.log(Authentication.user);
                  $state.go('gcodes.list');
              }
          });

      }
    // Save Gcode
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.gcodeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.gcode._id) {
        vm.gcode.$update(successCallback, errorCallback);
      } else {
        vm.gcode.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('gcodes.view', {
          gcodeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
