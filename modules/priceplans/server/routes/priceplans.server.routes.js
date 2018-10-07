'use strict';

/**
 * Module dependencies
 */
var priceplansPolicy = require('../policies/priceplans.server.policy'),
    priceplans = require('../controllers/priceplans.server.controller');

module.exports = function (app) {
    // Priceplans Routes
    app.route('/api/priceplans').all(priceplansPolicy.isAllowed)
        .get(priceplans.list)
        .post(priceplans.create);

    app.route('/api/priceplans/findBy').all(priceplansPolicy.isAllowed)
        .post(priceplans.list);

    app.route('/api/priceplans/:priceplanId').all(priceplansPolicy.isAllowed)
        .get(priceplans.read)
        .put(priceplans.update)
        .delete(priceplans.delete);

    // Finish by binding the Priceplan middleware
    app.param('priceplanId', priceplans.priceplanByID);
};
