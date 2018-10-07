// Priceplans service used to communicate Priceplans REST endpoints
(function () {
    'use strict';

    angular
        .module('priceplans')
        .factory('PriceplansService', PriceplansService);

    PriceplansService.$inject = ['$resource'];

    function PriceplansService($resource) {
        return $resource('/api/priceplans/:priceplanId', {
            priceplanId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            findBy: {
                method: 'POST',
                url: '/api/priceplans/findBy',
                isArray: true
            }
        });
    }
}());
