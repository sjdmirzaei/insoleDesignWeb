'use strict';

/**
 * Module dependencies
 */
var usercreditsPolicy = require('../policies/usercredits.server.policy'),
  usercredits = require('../controllers/usercredits.server.controller');

module.exports = function(app) {
  // Usercredits Routes
  app.route('/api/usercredits').all(usercreditsPolicy.isAllowed)
    .get(usercredits.list)
    .post(usercredits.create);

  app.route('/api/usercredits/verify').all(usercreditsPolicy.isAllowed)
      .post(usercredits.verify);

  app.route('/api/usercredits/:usercreditId').all(usercreditsPolicy.isAllowed)
    .get(usercredits.read)
    .put(usercredits.update)
    .delete(usercredits.delete);

  // Finish by binding the Usercredit middleware
  app.param('usercreditId', usercredits.usercreditByID);
};
