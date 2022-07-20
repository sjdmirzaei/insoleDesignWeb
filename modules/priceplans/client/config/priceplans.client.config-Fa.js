(function () {
  'use strict';

  // angular
  //   .module('priceplans')
  //   .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'تعرفه ها',
        icon:'ti-money',
      state: 'priceplans',
      type: 'dropdown',
        roles: ['cnc','admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'priceplans', {
      title: 'لیست تعرفه ها',
      state: 'priceplans.list',
        roles: ['cnc','admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'priceplans', {
      title: 'ساخت تعرفه',
      state: 'priceplans.create',
        roles: ['cnc','admin']
    });
  }
}());
