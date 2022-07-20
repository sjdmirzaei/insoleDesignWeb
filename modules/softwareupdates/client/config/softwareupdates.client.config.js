(function () {
  'use strict';

  angular
    .module('softwareupdates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Software Updates',
        icon:'ti-briefcase',
      state: 'softwareupdates',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'softwareupdates', {
      title: 'List',
      state: 'softwareupdates.list',
        roles: ['admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'softwareupdates', {
      title: 'Create',
      state: 'softwareupdates.create',
        roles: ['admin']
    });
  }
}());
