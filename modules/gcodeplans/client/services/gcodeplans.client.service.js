// Gcodeplans service used to communicate Gcodeplans REST endpoints
(function () {
  'use strict';

  angular
    .module('gcodeplans')
    .factory('GcodeplansService', GcodeplansService);

  GcodeplansService.$inject = ['$resource'];

  function GcodeplansService($resource) {
    return $resource('/api/gcodeplans/:gcodeplanId', {
      gcodeplanId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
