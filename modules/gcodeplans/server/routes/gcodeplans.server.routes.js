'use strict';

/**
 * Module dependencies
 */
var gcodeplansPolicy = require('../policies/gcodeplans.server.policy'),
  gcodeplans = require('../controllers/gcodeplans.server.controller');

module.exports = function(app) {
  // Gcodeplans Routes
  app.route('/api/gcodeplans').all(gcodeplansPolicy.isAllowed)
    .get(gcodeplans.list)
    .post(gcodeplans.create);

  app.route('/api/gcodeplans/:gcodeplanId').all(gcodeplansPolicy.isAllowed)
    .get(gcodeplans.read)
    .put(gcodeplans.update)
    .delete(gcodeplans.delete);

  // Finish by binding the Gcodeplan middleware
  app.param('gcodeplanId', gcodeplans.gcodeplanByID);
};
