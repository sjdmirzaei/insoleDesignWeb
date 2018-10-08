(function () {
    'use strict';

    angular
        .module('usercredits')
        .run(menuConfig);

    menuConfig.$inject = ['menuService'];

    function menuConfig(menuService) {
        // Set top bar menu items
        menuService.addMenuItem('topbar', {
            title: 'اعتبار حساب',
            icon:'ti-credit-card',
            state: 'usercredits',
            type: 'dropdown',
            roles: ['cnc', 'admin','doctor']
        });

        // Add the dropdown list item
        menuService.addSubMenuItem('topbar', 'usercredits', {
            title: 'فیش های بانکی',
            state: 'usercredits.list',
            roles: ['cnc', 'admin','doctor']
        });

        // Add the dropdown create item
        menuService.addSubMenuItem('topbar', 'usercredits', {
            title: 'افزایش اعتبار',
            state: 'usercredits.create',
            roles: ['cnc', 'admin','doctor']
        });

      // Add the dropdown create item
      menuService.addSubMenuItem('topbar', 'usercredits', {
        title: 'خرید بسته',
        state: 'usercredits.package',
        roles: ['cnc', 'admin']
      });
    }
}());
