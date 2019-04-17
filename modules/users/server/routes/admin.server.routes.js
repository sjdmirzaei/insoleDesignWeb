'use strict';

/**
 * Module dependencies
 */
var adminPolicy = require('../policies/admin.server.policy'),
  admin = require('../controllers/admin.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/users')
    .get(adminPolicy.isAllowed, admin.list);

  // Users collection routes
  app.route('/api/usersFiles')
    .get(adminPolicy.isAllowed, admin.folderList);
  // Users Transactions routes
  app.route('/api/usersTransactions')
    .get(adminPolicy.isAllowed, admin.transactionList);
// Users collection routes
  app.route('/api/completeDelete')
    .post(adminPolicy.isAllowed, admin.completeDelete);
  app.route('/admin/patient/completeDownload/:userPath')
    .get(adminPolicy.isAllowed, admin.completeDownload);
  // Single user routes
  app.route('/api/users/:userId')
    .get(adminPolicy.isAllowed, admin.read)
    .put(adminPolicy.isAllowed, admin.update)
    .delete(adminPolicy.isAllowed, admin.delete);

    app.route('/api/report')
        .post(adminPolicy.isAllowed, admin.report)
  // Finish by binding the user middleware
  app.param('userId', admin.userByID);
};
