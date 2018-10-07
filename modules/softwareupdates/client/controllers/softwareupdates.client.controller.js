(function () {
  'use strict';

  // Softwareupdates controller
  angular
    .module('softwareupdates')
    .controller('SoftwareupdatesController', SoftwareupdatesController);

  SoftwareupdatesController.$inject = ['$scope', '$state','$timeout', '$window', 'Authentication', 'softwareupdateResolve','Upload', 'Notification'];

  function SoftwareupdatesController ($scope, $state,$timeout, $window, Authentication, softwareupdate,Upload, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.softwareupdate = softwareupdate;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Softwareupdate
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.softwareupdate.$remove($state.go('softwareupdates.list'));
      }
    }

    // Save Softwareupdate
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.softwareupdateForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.softwareupdate._id) {
        vm.softwareupdate.$update(successCallback, errorCallback);
      } else {
        vm.softwareupdate.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('softwareupdates.view', {
          softwareupdateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

      vm.progress = 0;

      vm.upload = function (dataUrl) {

          Upload.upload({
              url: '/api/softwareupdates/add',
              data: {
                  name:vm.form.name,
                  version:vm.form.version,
                  updateFile: dataUrl
              }
          }).then(function (response) {
              $timeout(function () {
                  onSuccessItem(response.data);
              });
          }, function (response) {
              if (response.status > 0) onErrorItem(response.data);
          }, function (evt) {
              vm.fileSelected = true;
              vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
              console.log(vm.progress);
          });
      };

      // Called after the user has successfully uploaded a new picture
      function onSuccessItem(response) {
          // Show success message
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>با موفقیت ارسال شد' });

          // Populate user object
          //vm.user = Authentication.user = response;

          // Reset form
          vm.fileSelected = false;
          vm.progress = 0;
      }

      // Called after the user has failed to upload a new picture
      function onErrorItem(response) {
          vm.fileSelected = false;
          vm.progress = 0;

          // Show error message
          Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> خطا در ارسال فایل' });
      }
  }
}());
