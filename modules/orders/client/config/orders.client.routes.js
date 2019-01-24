(function () {
    'use strict';

    angular
        .module('orders')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('orders', {
                abstract: true,
                url: '/orders',
                template: '<ui-view/>'
            })
            .state('orders.list', {
                url: '',
                templateUrl: '/modules/orders/client/views/list-orders.client.view.html',
                controller: 'OrdersListController',
                controllerAs: 'vm',
                data: {
                    roles: ['user', 'doctor','cnc'],
                    pageTitle: 'Orders List'
                }
            })
            .state('orders.create', {
                url: '/create/:patientId',
                defaultParams: {patientId: 'new'},
                templateUrl: '/modules/orders/client/views/form-order.client.view.html',
                controller: 'OrdersController',
                controllerAs: 'vm',
                resolve: {
                    orderResolve: newOrder,
                    patientsResolve: getPatients,
                    cncUsersResolve: getCncUsers,
                },
                data: {
                    roles: ['user', 'doctor','cnc'],
                    pageTitle: 'Orders Create'
                }
            })
            .state('orders.edit', {
                url: '/:orderId/edit',
                templateUrl: '/modules/orders/client/views/form-order.client.view.html',
                controller: 'OrdersController',
                controllerAs: 'vm',
                resolve: {
                    orderResolve: getOrder,
                    patientsResolve: getPatients,
                    cncUsersResolve: getCncUsers,

                },
                data: {
                    roles: ['user', 'doctor','cnc'],
                    pageTitle: 'Edit Order {{ orderResolve.name }}'
                }
            })
            .state('orders.view', {
                url: '/:orderId',
                templateUrl: '/modules/orders/client/views/view-order.client.view.html',
                controller: 'ViewOrdersController',
                controllerAs: 'vm',
                resolve: {
                    orderResolve: getOrder,
                    patientsResolve: getPatients,
                    cncUsersResolve: getCncUsers,

                },
                data: {
                    roles: ['user', 'doctor','cnc'],
                    pageTitle: 'Order {{ orderResolve.name }}'
                }
            });
    }

    getOrder.$inject = ['$stateParams', 'OrdersService'];

    function getOrder($stateParams, OrdersService) {
        return OrdersService.get({
            orderId: $stateParams.orderId
        }).$promise;
    }

    getCncUsers.$inject = ['$stateParams', 'UsersService'];

    function getCncUsers($stateParams, UsersService) {
        return UsersService.query({role:'cnc'}).$promise;
    }


    getPatients.$inject = ['PatientsService'];

    function getPatients(PatientsService) {
        return PatientsService.findBy({}).$promise;
    }

    newOrder.$inject = ['OrdersService'];

    function newOrder(OrdersService) {
        return new OrdersService();
    }
}());
