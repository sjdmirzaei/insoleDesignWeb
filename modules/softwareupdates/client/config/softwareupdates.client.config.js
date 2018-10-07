(function () {
  'use strict';

  angular
    .module('softwareupdates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'بروزرسانی ها',
        icon:'ti-briefcase',
      state: 'softwareupdates',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'softwareupdates', {
      title: 'لیست ورژن ها',
      state: 'softwareupdates.list',
        roles: ['admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'softwareupdates', {
      title: 'ایجاد ورژن جدید',
      state: 'softwareupdates.create',
        roles: ['admin']
    });
  }
}());
