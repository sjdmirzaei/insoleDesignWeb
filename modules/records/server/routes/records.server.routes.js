'use strict';

/**
 * Module dependencies
 */
var recordsPolicy = require('../policies/records.server.policy'),
    records = require('../controllers/records.server.controller');

module.exports = function (app) {
    // Records Routes
    app.route('/api/records/add').all(recordsPolicy.isAllowed).post(records.import);
    app.route('/api/records/download/:recordId').all(recordsPolicy.isAllowed).get(records.download);
    app.route('/api/records/download/last/:recordId').all(recordsPolicy.isAllowed).get(records.downloadLast);
    app.route('/api/records/findBy').all(recordsPolicy.isAllowed).post(records.findBy);
    app.route('/api/records').all(recordsPolicy.isAllowed)
        .get(records.list)
        .post(records.create);

    app.route('/api/records/:recordId').all(recordsPolicy.isAllowed)
        .get(records.read)
        .put(records.update)
        .delete(records.delete);

    // Finish by binding the Record middleware
    app.param('recordId', records.recordByID);
};
