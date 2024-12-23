'use strict';

/**
 * Module dependencies
 */
var gcodesPolicy = require('../policies/gcodes.server.policy'),
    gcodes = require('../controllers/gcodes.server.controller');

module.exports = function (app) {
    // Gcodes Routes
    app.route('/api/gcodes').all(gcodesPolicy.isAllowed)
        .get(gcodes.list)
        .post(gcodes.create);
    app.route('/api/gcodes/pay').all(gcodesPolicy.isAllowed)
        .post(gcodes.pay);

    app.route('/gcodes/download/:gcodeId').all(gcodesPolicy.isAllowed)
        .get(gcodes.download);

    app.route('/gcodes/downloadSTL/:gcodeId').all(gcodesPolicy.isAllowed)
        .get(gcodes.downloadFile);

    app.route('/api/gcodes/:gcodeId').all(gcodesPolicy.isAllowed)
        .get(gcodes.read)
        .put(gcodes.update)
        .delete(gcodes.delete);

    // Finish by binding the Gcode middleware
    app.param('gcodeId', gcodes.gcodeByID);
};
