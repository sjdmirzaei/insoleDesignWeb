(function () {
  'use strict';

  // Usercredits controller
  angular
    .module('usercredits')
    .controller('UsercreditsController', UsercreditsController);

  UsercreditsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'usercreditResolve','creditPlansResolver','gcodePlansResolver','paymentService'];
  // var mongoose = require('mongoose');
  //
  //  var User = mongoose.model('User');
  function UsercreditsController ($scope, $state, $window, Authentication, usercredit,creditPlansResolver,gcodePlansResolver,paymentService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.usercredit = usercredit;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.PaymentRequest=PaymentRequest;
    //vm.addCredit = addCredit;

    vm.creditplans=creditPlansResolver;
    vm.gcodeplans=gcodePlansResolver;

    // Remove existing Usercredit
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.usercredit.$remove($state.go('usercredits.list'));
      }
    }
    function PaymentRequest(plan){
          paymentService.create(plan).$promise.then(function (response) {
            // alert(response.url);
            //   $window.open(response.url,'_blank');
            $window.open(response.url,'_top');
            //console.log(response);
          })
      }
    // Save Usercredit
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.usercreditForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.usercredit._id) {
        vm.usercredit.$update(successCallback, errorCallback);
      } else {
        vm.usercredit.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('usercredits.list', {
          usercreditId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
