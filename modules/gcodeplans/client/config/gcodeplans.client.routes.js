(function () {
  'use strict';

  angular
    .module('gcodeplans')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('gcodeplans', {
        abstract: true,
        url: '/gcodeplans',
        template: '<ui-view/>'
      })
      .state('gcodeplans.list', {
        url: '',
        templateUrl: '/modules/gcodeplans/client/views/list-gcodeplans.client.view.html',
        controller: 'GcodeplansListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Gcodeplans List'
        }
      })
      .state('gcodeplans.create', {
        url: '/create',
        templateUrl: '/modules/gcodeplans/client/views/form-gcodeplan.client.view.html',
        controller: 'GcodeplansController',
        controllerAs: 'vm',
        resolve: {
          gcodeplanResolve: newGcodeplan
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Gcodeplans Create'
        }
      })
      .state('gcodeplans.edit', {
        url: '/:gcodeplanId/edit',
        templateUrl: '/modules/gcodeplans/client/views/form-gcodeplan.client.view.html',
        controller: 'GcodeplansController',
        controllerAs: 'vm',
        resolve: {
          gcodeplanResolve: getGcodeplan
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Gcodeplan {{ gcodeplanResolve.name }}'
        }
      })
      .state('gcodeplans.view', {
        url: '/:gcodeplanId',
        templateUrl: '/modules/gcodeplans/client/views/view-gcodeplan.client.view.html',
        controller: 'GcodeplansController',
        controllerAs: 'vm',
        resolve: {
          gcodeplanResolve: getGcodeplan
        },
        data: {
          pageTitle: 'Gcodeplan {{ gcodeplanResolve.name }}'
        }
      });
  }

  getGcodeplan.$inject = ['$stateParams', 'GcodeplansService'];

  function getGcodeplan($stateParams, GcodeplansService) {
    return GcodeplansService.get({
      gcodeplanId: $stateParams.gcodeplanId
    }).$promise;
  }

  newGcodeplan.$inject = ['GcodeplansService'];

  function newGcodeplan(GcodeplansService) {
    return new GcodeplansService();
  }
}());
