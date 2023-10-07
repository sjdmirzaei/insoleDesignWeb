'use strict';

/**
 * Module dependencies
 */
var passport = require('passport');

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users password api
  app.route('/api/auth/forgot').post(users.forgot);
  app.route('/api/auth/reset/:token').get(users.validateResetToken);
  app.route('/api/auth/reset/:token').post(users.reset);

  // Setting up the users authentication api
  app.route('/api/auth/signup').post(users.signup);
  app.route('/api/auth/licensesignin').post(function (req,res,next) {   
      if (req.body.software){
          req.session.software=req.body.software;
      }else{
          req.session.software="PT-InsoleDesign";
      }
      next();
  },users.lsignin);
  app.route('/api/auth/signin').post(function (req,res,next) {
    // if (req.body.software){
    //   req.session.softwareVersion=req.body.softwareVersion;
    // }else{
    //   req.session.softwareVersion=false;
    // }
      if (req.body.software){
          req.session.software=req.body.software;
      }else{
          req.session.software="PT-SCANSUIT";
      }

      next();
  },users.signin);
  app.route('/api/auth/signout').get(users.signout);

  // Setting the oauth routes
  app.route('/api/auth/:strategy').get(users.oauthCall);
  app.route('/api/auth/:strategy/callback').get(users.oauthCallback);

};
