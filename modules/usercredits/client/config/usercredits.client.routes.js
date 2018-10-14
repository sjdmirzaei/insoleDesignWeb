(function () {
  'use strict';

  angular
    .module('usercredits')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('usercredits', {
        abstract: true,
        url: '/usercredits',
        template: '<ui-view/>'
      })
      .state('usercredits.list', {
        url: '',
        templateUrl: '/modules/usercredits/client/views/list-usercredits.client.view.html',
        controller: 'UsercreditsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Usercredits List'
        }
      })
      // .state('usercredits.list', {
      //   url: '',
      //   templateUrl: '/modules/usercredits/client/views/list-usercredits.client.view.html',
      //   controller: 'UsercreditsListController',
      //   controllerAs: 'vm',
      //   data: {
      //     pageTitle: 'Usercredits List'
      //   }
      // })
      .state('usercredits.package', {
        url: '/package',
        templateUrl: '/modules/usercredits/client/views/package-usercredit.client.view.html',
        controller: 'UsercreditsController',
        controllerAs: 'vm',
        resolve: {
          usercreditResolve: newUsercredit,
          creditPlansResolver:getCreditPlans,
          gcodePlansResolver:getGcodePlans

        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Usercredits Create'
        }
      })
      .state('usercredits.create', {
        url: '/create',
        templateUrl: '/modules/usercredits/client/views/form-usercredit.client.view.html',
        controller: 'UsercreditsController',
        controllerAs: 'vm',
        resolve: {
          usercreditResolve: newUsercredit,
            creditPlansResolver:getCreditPlans,
          gcodePlansResolver:getGcodePlans

        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Usercredits Create'
        }
      })
      .state('usercredits.edit', {
        url: '/:usercreditId/edit',
        templateUrl: '/modules/usercredits/client/views/form-usercredit.client.view.html',
        controller: 'UsercreditsController',
        controllerAs: 'vm',
        resolve: {
          usercreditResolve: getUsercredit
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Usercredit {{ usercreditResolve.name }}'
        }
      })
      .state('usercredits.view', {
        url: '/:usercreditId',
        templateUrl: '/modules/usercredits/client/views/view-usercredit.client.view.html',
        controller: 'UsercreditsController',
        controllerAs: 'vm',
        resolve: {
          usercreditResolve: getUsercredit
        },
        data: {
          pageTitle: 'Usercredit {{ usercreditResolve.name }}'
        }
      });
  }
    getCreditPlans.$inject = ['$stateParams', 'CreditplansService'];

    function getCreditPlans($stateParams, CreditplansService) {
        return CreditplansService.query().$promise;
    }

  getGcodePlans.$inject = ['$stateParams', 'GcodeplansService'];

  function getGcodePlans($stateParams,GcodeplansService) {
    return GcodeplansService.query().$promise;
  }
  getUsercredit.$inject = ['$stateParams', 'UsercreditsService'];

  function getUsercredit($stateParams, UsercreditsService) {
    return UsercreditsService.get({
      usercreditId: $stateParams.usercreditId
    }).$promise;
  }

  newUsercredit.$inject = ['UsercreditsService'];

  function newUsercredit(UsercreditsService) {
    return new UsercreditsService();
  }
}());
