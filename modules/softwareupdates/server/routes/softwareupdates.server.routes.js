'use strict';

/**
 * Module dependencies
 */
var softwareupdatesPolicy = require('../policies/softwareupdates.server.policy'),
  softwareupdates = require('../controllers/softwareupdates.server.controller');

module.exports = function(app) {
  // Softwareupdates Routes
  app.route('/api/softwareupdates').all(softwareupdatesPolicy.isAllowed)
    .get(softwareupdates.list)
    .post(softwareupdates.create);

  app.route('/api/softwareupdates/add').all(softwareupdatesPolicy.isAllowed).post(softwareupdates.import);

  app.route('/api/softwareupdates/:softwareupdateId').all(softwareupdatesPolicy.isAllowed)
    .get(softwareupdates.read)
    .put(softwareupdates.update)
    .delete(softwareupdates.delete);

  // Finish by binding the Softwareupdate middleware
  app.param('softwareupdateId', softwareupdates.softwareupdateByID);
};
