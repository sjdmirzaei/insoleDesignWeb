(function () {
    'use strict';

    angular
        .module('orders')
        .run(menuConfig);

    menuConfig.$inject = ['menuService'];

    function menuConfig(menuService) {
        // Set top bar menu items
        menuService.addMenuItem('topbar', {
            icon:'ti-shopping-cart',
            title: 'Orders',
            state: 'orders',
            type: 'dropdown',
            roles: ['cnc', 'doctor']
        });

        // Add the dropdown list item
        menuService.addSubMenuItem('topbar', 'orders', {
            title: 'List',
            state: 'orders.list',
            roles: ['cnc', 'doctor']
        });

        // Add the dropdown create item
        // menuService.addSubMenuItem('topbar', 'orders', {
        //     title: 'ایجاد سفارش',
        //     state: 'orders.create',
        //     roles: ['cnc','doctor']
        // });
    }
}());
