(function () {
  'use strict';

  angular
    .module('creditplans')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('creditplans', {
        abstract: true,
        url: '/creditplans',
        template: '<ui-view/>'
      })
      .state('creditplans.list', {
        url: '',
        templateUrl: '/modules/creditplans/client/views/list-creditplans.client.view.html',
        controller: 'CreditplansListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Creditplans List'
        }
      })
      .state('creditplans.create', {
        url: '/create',
        templateUrl: '/modules/creditplans/client/views/form-creditplan.client.view.html',
        controller: 'CreditplansController',
        controllerAs: 'vm',
        resolve: {
          creditplanResolve: newCreditplan
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Creditplans Create'
        }
      })
      .state('creditplans.edit', {
        url: '/:creditplanId/edit',
        templateUrl: '/modules/creditplans/client/views/form-creditplan.client.view.html',
        controller: 'CreditplansController',
        controllerAs: 'vm',
        resolve: {
          creditplanResolve: getCreditplan
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Creditplan {{ creditplanResolve.name }}'
        }
      })
      .state('creditplans.view', {
        url: '/:creditplanId',
        templateUrl: '/modules/creditplans/client/views/view-creditplan.client.view.html',
        controller: 'CreditplansController',
        controllerAs: 'vm',
        resolve: {
          creditplanResolve: getCreditplan
        },
        data: {
          pageTitle: 'Creditplan {{ creditplanResolve.name }}'
        }
      });
  }

  getCreditplan.$inject = ['$stateParams', 'CreditplansService'];

  function getCreditplan($stateParams, CreditplansService) {
    return CreditplansService.get({
      creditplanId: $stateParams.creditplanId
    }).$promise;
  }

  newCreditplan.$inject = ['CreditplansService'];

  function newCreditplan(CreditplansService) {
    return new CreditplansService();
  }
}());
