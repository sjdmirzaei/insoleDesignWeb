(function () {
    'use strict';

    angular
        .module('gcodes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('gcodes', {
                abstract: true,
                url: '/gcodes',
                template: '<ui-view/>'
            })
            .state('gcodes.list', {
                url: '',
                templateUrl: '/modules/gcodes/client/views/list-gcodes.client.view.html',
                controller: 'GcodesListController',
                controllerAs: 'vm',
                data: {
                    roles: ['user', 'doctor', 'cnc'],
                    pageTitle: 'Gcodes List'
                }
            })
            .state('gcodes.create', {
                url: '/create',
                templateUrl: '/modules/gcodes/client/views/form-gcode.client.view.html',
                controller: 'GcodesController',
                controllerAs: 'vm',
                resolve: {
                    gcodeResolve: newGcode
                },
                data: {
                    roles: ['user', 'doctor', 'cnc'],
                    pageTitle: 'Gcodes Create'
                }
            })
            .state('gcodes.edit', {
                url: '/:gcodeId/edit',
                templateUrl: '/modules/gcodes/client/views/form-gcode.client.view.html',
                controller: 'GcodesController',
                controllerAs: 'vm',
                resolve: {
                    gcodeResolve: getGcode
                },
                data: {
                    roles: ['user', 'doctor', 'cnc'],
                    pageTitle: 'Edit Gcode {{ gcodeResolve.name }}'
                }
            })
            .state('gcodes.view', {
                url: '/:gcodeId',
                templateUrl: '/modules/gcodes/client/views/view-gcode.client.view.html',
                controller: 'GcodesController',
                controllerAs: 'vm',
                resolve: {
                    gcodeResolve: getGcode
                },
                data: {
                    roles: ['user', 'doctor', 'cnc'],
                    pageTitle: 'Gcode {{ gcodeResolve.name }}'
                }
            });
    }

    getGcode.$inject = ['$stateParams', 'GcodesService'];

    function getGcode($stateParams, GcodesService) {
        return GcodesService.get({
            gcodeId: $stateParams.gcodeId
        }).$promise;
    }

    newGcode.$inject = ['GcodesService'];

    function newGcode(GcodesService) {
        return new GcodesService();
    }
}());
