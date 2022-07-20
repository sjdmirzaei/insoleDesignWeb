(function () {
  'use strict';

  angular
    .module('transactions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'تراکنش ها',
        icon:'ti-receipt',
      state: 'transactions',
      type: 'dropdown',
      roles: ['cnc','admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'transactions', {
      title: 'لیست تراکنش ها',
      state: 'transactions.list',
        roles: ['cnc','admin']
    });

    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'transactions', {
    //   title: 'ایجاد تراکنش جدید',
    //   state: 'transactions.create',
    //   roles: ['cnc','admin']
    // });
  }
}());
