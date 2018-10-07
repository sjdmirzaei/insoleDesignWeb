(function () {
    'use strict';

    // Setting up route
    angular
        .module('usercredits.admin.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {

        $stateProvider
            .state('admin.usercredits', {
                url: '/usercredits',
                templateUrl: '/modules/usercredits/client/views/admin/list-usercredits.client.view.html',
                controller: 'UsercreditsListController',
                controllerAs: 'vm',
                resolve: {
                    usercreditResolve: getUsercredit
                },
            })
        ;
        getUsercredit.$inject = ['$stateParams', 'UsercreditsService'];

        function getUsercredit($stateParams, UsercreditsService) {
            return UsercreditsService.query().$promise;
        }

        // getUser.$inject = ['$stateParams', 'AdminService'];
        //
        // function getUser($stateParams, AdminService) {
        //   return AdminService.get({
        //     userId: $stateParams.userId
        //   }).$promise;
        // }
    }
}());
