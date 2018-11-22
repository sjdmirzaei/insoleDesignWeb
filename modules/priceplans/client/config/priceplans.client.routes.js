(function () {
  'use strict';

  angular
    .module('priceplans')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('priceplans', {
        abstract: true,
        url: '/priceplans',
        template: '<ui-view/>'
      })
      .state('priceplans.list', {
        url: '',
        templateUrl: '/modules/priceplans/client/views/list-priceplans.client.view.html',
        controller: 'PriceplansListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Priceplans List'
        }
      })
      .state('priceplans.create', {
        url: '/create',
        templateUrl: '/modules/priceplans/client/views/form-priceplan.client.view.html',
        controller: 'PriceplansController',
        controllerAs: 'vm',
        resolve: {
          priceplanResolve: newPriceplan
        },
        data: {
          roles: ['cnc', 'admin'],
          pageTitle: 'Priceplans Create'
        }
      })
      .state('priceplans.edit', {
        url: '/:priceplanId/edit',
        templateUrl: '/modules/priceplans/client/views/form-priceplan.client.view.html',
        controller: 'PriceplansController',
        controllerAs: 'vm',
        resolve: {
          priceplanResolve: getPriceplan
        },
        data: {
          roles: ['cnc', 'admin'],
          pageTitle: 'Edit Priceplan {{ priceplanResolve.name }}'
        }
      })
      .state('priceplans.view', {
        url: '/:priceplanId',
        templateUrl: '/modules/priceplans/client/views/view-priceplan.client.view.html',
        controller: 'PriceplansController',
        controllerAs: 'vm',
        resolve: {
          priceplanResolve: getPriceplan
        },
        data: {
          pageTitle: 'Priceplan {{ priceplanResolve.name }}'
        }
      });
  }

  getPriceplan.$inject = ['$stateParams', 'PriceplansService'];

  function getPriceplan($stateParams, PriceplansService) {
    return PriceplansService.get({
      priceplanId: $stateParams.priceplanId
    }).$promise;
  }

  newPriceplan.$inject = ['PriceplansService'];

  function newPriceplan(PriceplansService) {
    return new PriceplansService();
  }
}());
