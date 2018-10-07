// Usercredits service used to communicate Usercredits REST endpoints
(function () {
    'use strict';

    angular
        .module('usercredits')
        .factory('UsercreditsService', UsercreditsService);

    UsercreditsService.$inject = ['$resource'];

    function UsercreditsService($resource) {
        return $resource('/api/usercredits/:usercreditId', {
                usercreditId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                },
                verify: {
                    method: 'POST',
                    url: '/api/usercredits/verify',
                }
            }
        );
    }
}());
