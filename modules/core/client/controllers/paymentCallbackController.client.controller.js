(function () {
  'use strict';

  angular
    .module('core')
    .controller('PaymentCallbackController', PaymentCallbackController);

    PaymentCallbackController.$inject = ['$stateParams'];

  function PaymentCallbackController($stateParams) {
    var vm = this;
    vm.errorMessage = null;
    vm.RefID=response.RefID;
    // Display custom message if it was set
    if ($stateParams.message) vm.errorMessage = $stateParams.message;
  }
}());

