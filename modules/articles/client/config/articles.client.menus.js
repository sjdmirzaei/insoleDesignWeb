(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      icon:'ti-info-alt',
      title: 'اطلاعیه ها',
      state: 'articles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'لیست اطلاعیه ها',
      state: 'articles.list',
      roles: ['*']
    });
  }
}());
