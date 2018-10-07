// Softwareupdates service used to communicate Softwareupdates REST endpoints
(function () {
  'use strict';

  angular
    .module('softwareupdates')
    .factory('SoftwareupdatesService', SoftwareupdatesService);

  SoftwareupdatesService.$inject = ['$resource'];

  function SoftwareupdatesService($resource) {
    return $resource('/api/softwareupdates/:softwareupdateId', {
      softwareupdateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
