(function () {
  'use strict';

  angular
    .module('creditplans')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
        icon:'ti-money',
      title: 'Credit Plans',
      state: 'creditplans',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'creditplans', {

      title: 'List',
      state: 'creditplans.list',
        roles: ['admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'creditplans', {
      title: 'Create',
      state: 'creditplans.create',
      roles: ['admin']
    });
  }
}());
