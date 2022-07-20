(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Users',
      state: 'admin.users'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'User Files',
      state: 'admin.usersFiles'
    });
    // menuService.addSubMenuItem('topbar', 'admin', {
    //   title: 'مشاهده تراکنش ها',
    //   state: 'admin.usersTransactions'
    // });
    // menuService.addSubMenuItem('topbar', 'admin', {
    //   title: 'مشاهده خریدهای آنلاین',
    //   state: 'admin.usersPayments'
    // });
    //   menuService.addSubMenuItem('topbar', 'admin', {
    //       title: 'گزارش کاربران',
    //       state: 'admin.reports'
    //   });
  }
}());
