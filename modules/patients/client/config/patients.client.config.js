(function () {
  'use strict';

  angular
    .module('patients')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'بیماران',
        icon:'ti-id-badge',
      state: 'patients',
      type: 'dropdown',
        roles: ['user','doctor']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'patients', {
      title: 'لیست بیماران',
      state: 'patients.list',
        roles: ['user','doctor']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'patients', {
      title: 'ایجاد پرونده بیمار',
      state: 'patients.create',
        roles: ['user','doctor']
    });
  }
}());
