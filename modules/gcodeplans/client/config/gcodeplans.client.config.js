(function () {
  'use strict';

  angular
    .module('gcodeplans')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
        icon:'ti-money',
      title: 'بسته های gcode',
      state: 'gcodeplans',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'gcodeplans', {

      title: 'لیست بسته ها',
      state: 'gcodeplans.list',
        roles: ['admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'gcodeplans', {
      title: 'ساخت بسته',
      state: 'gcodeplans.create',
      roles: ['admin']
    });
  }
}());
