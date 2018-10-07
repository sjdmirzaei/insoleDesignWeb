(function () {
  'use strict';

  angular
    .module('usercredits')
    .factory('paymentService', paymentService);

  paymentService.$inject = ['$resource'];

  function paymentService($resource) {
      return $resource('/PaymentRequest', {}, {
              create: {
                  method: 'POST'
              }
          }
      );
    // return {
    //     PaymentRequest: function () {
    //     return true;
    //   }
    // };
  }
})();
