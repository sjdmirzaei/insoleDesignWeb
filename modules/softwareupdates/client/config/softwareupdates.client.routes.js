(function () {
  'use strict';

  angular
    .module('softwareupdates')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('softwareupdates', {
        abstract: true,
        url: '/softwareupdates',
        template: '<ui-view/>'
      })
      .state('softwareupdates.list', {
        url: '',
        templateUrl: '/modules/softwareupdates/client/views/list-softwareupdates.client.view.html',
        controller: 'SoftwareupdatesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Softwareupdates List'
        }
      })
      .state('softwareupdates.create', {
        url: '/create',
        templateUrl: '/modules/softwareupdates/client/views/form-softwareupdate.client.view.html',
        controller: 'SoftwareupdatesController',
        controllerAs: 'vm',
        resolve: {
          softwareupdateResolve: newSoftwareupdate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Softwareupdates Create'
        }
      })
      .state('softwareupdates.edit', {
        url: '/:softwareupdateId/edit',
        templateUrl: '/modules/softwareupdates/client/views/form-softwareupdate.client.view.html',
        controller: 'SoftwareupdatesController',
        controllerAs: 'vm',
        resolve: {
          softwareupdateResolve: getSoftwareupdate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Softwareupdate {{ softwareupdateResolve.name }}'
        }
      })
      .state('softwareupdates.view', {
        url: '/:softwareupdateId',
        templateUrl: '/modules/softwareupdates/client/views/view-softwareupdate.client.view.html',
        controller: 'SoftwareupdatesController',
        controllerAs: 'vm',
        resolve: {
          softwareupdateResolve: getSoftwareupdate
        },
        data: {
          pageTitle: 'Softwareupdate {{ softwareupdateResolve.name }}'
        }
      });
  }

  getSoftwareupdate.$inject = ['$stateParams', 'SoftwareupdatesService'];

  function getSoftwareupdate($stateParams, SoftwareupdatesService) {
    return SoftwareupdatesService.get({
      softwareupdateId: $stateParams.softwareupdateId
    }).$promise;
  }

  newSoftwareupdate.$inject = ['SoftwareupdatesService'];

  function newSoftwareupdate(SoftwareupdatesService) {
    return new SoftwareupdatesService();
  }
}());
