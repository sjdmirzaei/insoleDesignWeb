// Records service used to communicate Records REST endpoints
(function () {
    'use strict';

    angular
        .module('records')
        .factory('RecordsService', RecordsService);

    RecordsService.$inject = ['$resource'];

    function RecordsService($resource) {
        var Records = $resource('/api/records/:recordId', {recordId: '@_id'},{
            update: {
                method: 'PUT'
            },
            removeRecord: {
                method: 'DELETE'
            },
            findRecord: {
                method: 'POST',
                url: '/api/records/findBy',
                isArray:true
            },
        });
        angular.extend(Records, {
            find: function (query) {
                return this.findRecord(query).$promise;
            },
        });
        return Records;
    }
}());
