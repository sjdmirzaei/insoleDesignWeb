(function () {
  'use strict';

  // angular
  //   .module('usercredits.admin')
  //   .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'مدیریت اعتبارات',
      state: 'admin.usercredits'
    });
  }
}());
