(function () {
  'use strict';

  angular
    .module('patients')
    .controller('PatientsListController', PatientsListController);

  PatientsListController.$inject = ['PatientsService','Upload', 'Notification','$timeout','RecordsService','$stateParams'];

  function PatientsListController(PatientsService,Upload, Notification,$timeout,RecordsService,$stateParams) {
    var vm = this;

    vm.patients = PatientsService.query();
      // vm.progress = 0;
      //
      // vm.upload = function (dataUrl) {
      //
      //     Upload.upload({
      //         url: '/api/patients/import',
      //         data: {
      //             patient:dataUrl
      //         }
      //     }).then(function (response) {
      //         $timeout(function () {
      //             onSuccessItem(response.data);
      //         });
      //     }, function (response) {
      //         if (response.status > 0) onErrorItem(response.data);
      //     }, function (evt) {
      //
      //         vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
      //         console.log(vm.progress);
      //     });
      // };
      //
      // // Called after the user has successfully uploaded a new picture
      // function onSuccessItem(response) {
      //     // Show success message
      //     Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>با موفقیت ارسال شد' });
      //
      //     // Populate user object
      //     vm.user = Authentication.user = response;
      //     vm.patients = PatientsService.query();
      //     // Reset form
      //     vm.fileSelected = false;
      //     vm.progress = 0;
      // }
      //
      // // Called after the user has failed to upload a new picture
      // function onErrorItem(response) {
      //     vm.fileSelected = false;
      //     vm.progress = 0;
      //
      //     // Show error message
      //     Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> خطا در ارسال فایل' });
      // }
  }
}());
