(function () {
    'use strict';

    angular
        .module('gcodes')
        .run(menuConfig);

    menuConfig.$inject = ['menuService'];

    function menuConfig(menuService) {
        // Set top bar menu items
        menuService.addMenuItem('topbar', {
            icon:'ti-package',
            title: 'Gcode ها',
            state: 'gcodes',
            type: 'dropdown',
            roles: ['cnc', 'doctor']
        });

        // Add the dropdown list item
        menuService.addSubMenuItem('topbar', 'gcodes', {
            title: 'لیست Gcode ها',
            state: 'gcodes.list'
        });

        // Add the dropdown create item
        // menuService.addSubMenuItem('topbar', 'gcodes', {
        //     title: 'دریافت Gcode جدید',
        //     state: 'gcodes.create',
        //     roles: ['cnc', 'doctor']
        // });
    }
}());
