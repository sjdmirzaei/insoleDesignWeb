'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Creditplan = mongoose.model('Creditplan'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Creditplan
 */
exports.create = function(req, res) {
  var creditplan = new Creditplan(req.body);
  creditplan.user = req.user;

  creditplan.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(creditplan);
    }
  });
};

/**
 * Show the current Creditplan
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var creditplan = req.creditplan ? req.creditplan.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  creditplan.isCurrentUserOwner = req.user && creditplan.user && creditplan.user._id.toString() === req.user._id.toString();

  res.jsonp(creditplan);
};

/**
 * Update a Creditplan
 */
exports.update = function(req, res) {
  var creditplan = req.creditplan;

  creditplan = _.extend(creditplan, req.body);

  creditplan.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(creditplan);
    }
  });
};

/**
 * Delete an Creditplan
 */
exports.delete = function(req, res) {
  var creditplan = req.creditplan;

  creditplan.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(creditplan);
    }
  });
};

/**
 * List of Creditplans
 */
exports.list = function(req, res) {
  Creditplan.find().sort('-created').populate('user', 'displayName').exec(function(err, creditplans) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(creditplans);
    }
  });
};

/**
 * Creditplan middleware
 */
exports.creditplanByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Creditplan is invalid'
    });
  }

  Creditplan.findById(id).populate('user', 'displayName').exec(function (err, creditplan) {
    if (err) {
      return next(err);
    } else if (!creditplan) {
      return res.status(404).send({
        message: 'No Creditplan with that identifier has been found'
      });
    }
    req.creditplan = creditplan;
    next();
  });
};
