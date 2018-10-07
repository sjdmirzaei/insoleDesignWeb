'use strict';

/**
 * Module dependencies
 */
var creditplansPolicy = require('../policies/creditplans.server.policy'),
  creditplans = require('../controllers/creditplans.server.controller');

module.exports = function(app) {
  // Creditplans Routes
  app.route('/api/creditplans').all(creditplansPolicy.isAllowed)
    .get(creditplans.list)
    .post(creditplans.create);

  app.route('/api/creditplans/:creditplanId').all(creditplansPolicy.isAllowed)
    .get(creditplans.read)
    .put(creditplans.update)
    .delete(creditplans.delete);

  // Finish by binding the Creditplan middleware
  app.param('creditplanId', creditplans.creditplanByID);
};
