'use strict';

/**
 * Module dependencies
 */
var ordersPolicy = require('../policies/orders.server.policy'),
    orders = require('../controllers/orders.server.controller');

module.exports = function (app) {
    // Orders Routes
    app.route('/api/orders').all(ordersPolicy.isAllowed)
        .post(orders.create);

    app.route('/api/orders').all(ordersPolicy.isAllowed)
        .get(orders.list)

    app.route('/api/orders/report').all(ordersPolicy.isAllowed)
        .post(orders.report)

    app.route('/api/orders/pay').all(ordersPolicy.isAllowed)
        .post(orders.pay);

    app.route('/api/orders/copy').all(ordersPolicy.isAllowed)
        .post(orders.copy);

    app.route('/api/orders/:orderId').all(ordersPolicy.isAllowed)
        .get(orders.read)
        .put(orders.update)
        .delete(orders.delete);


    // Finish by binding the Order middleware
    app.param('orderId', orders.orderByID);
};
