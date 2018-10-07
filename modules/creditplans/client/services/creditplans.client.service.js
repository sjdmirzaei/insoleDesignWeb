// Creditplans service used to communicate Creditplans REST endpoints
(function () {
  'use strict';

  angular
    .module('creditplans')
    .factory('CreditplansService', CreditplansService);

  CreditplansService.$inject = ['$resource'];

  function CreditplansService($resource) {
    return $resource('/api/creditplans/:creditplanId', {
      creditplanId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
