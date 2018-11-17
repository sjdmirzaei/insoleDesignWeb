(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'مدیریت کاربران',
      state: 'admin.users'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'مدیریت فایلهای کاربران',
      state: 'admin.usersFiles'
    });
      menuService.addSubMenuItem('topbar', 'admin', {
          title: 'گزارش کاربران',
          state: 'admin.reports'
      });
  }
}());
