// Gcodes service used to communicate Gcodes REST endpoints
(function () {
    'use strict';

    angular
        .module('gcodes')
        .factory('GcodesService', GcodesService);

    GcodesService.$inject = ['$resource'];

    function GcodesService($resource) {
        return $resource('/api/gcodes/:gcodeId', {
            gcodeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            payGcode: {
                method: 'POST',
                url: '/api/gcodes/pay',
            }
        });
    }
}());
