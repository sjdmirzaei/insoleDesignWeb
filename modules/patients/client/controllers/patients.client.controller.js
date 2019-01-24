patientRecords(function () {
    'use strict';

    // Patients controller
    angular
        .module('patients')
        .controller('PatientsController', PatientsController);

    PatientsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'patientResolve', 'Upload', 'Notification', '$timeout', 'RecordsService', '$stateParams'];

    function PatientsController($scope, $state, $window, Authentication, patient, Upload, Notification, $timeout, RecordsService, $stateParams) {
        var vm = this;

        vm.authentication = Authentication;
        vm.patient = patient;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        vm.removeRecord=removeRecord;
        RecordsService.find({patient: $stateParams.patientId}).then(function (data) {
            $scope.patientRecords = data;
        });

        function removeRecord(id) {
            if ($window.confirm('Are you sure you want to delete?')) {
                RecordsService.removeRecord({recordId:id}).$promise.then(function (data) {
                    RecordsService.find({patient: $stateParams.patientId}).then(function (data) {
                        $scope.patientRecords = data;
                    });
                })

            }
        }
        // Remove existing Patient
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.patient.$remove($state.go('patients.list'));
            }
        }

        // Save Patient
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.patientForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.patient._id) {
                vm.patient.$update(successCallback, errorCallback);
            } else {
                vm.patient.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('patients.view', {
                    patientId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }

        vm.progress = 0;

        vm.upload = function (dataUrl) {

            Upload.upload({
                url: '/api/records/add',
                data: {
                    patient: vm.patient._id,
                    record: dataUrl,
                    software:vm.software
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
                //console.log(vm.progress);
            });
        };

        // Called after the user has successfully uploaded a new picture
        function onSuccessItem(response) {
            // Show success message
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i>با موفقیت ارسال شد'});

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
            Notification.error({
                message: response.message,
                title: '<i class="glyphicon glyphicon-remove"></i> خطا در ارسال فایل'
            });
        }
    }
}());
