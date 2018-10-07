(function (app) {
    'use strict';

    app.registerModule('usercredits');
    app.registerModule('usercredits.admin');
    app.registerModule('usercredits.admin.routes',['ui.router', 'core.routes', 'users.admin.services']);

}(ApplicationConfiguration));
