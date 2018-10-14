'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Gcodeplan = mongoose.model('Gcodeplan'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Gcodeplan
 */
exports.create = function(req, res) {
  var gcodeplan = new Gcodeplan(req.body);
  gcodeplan.user = req.user;

  gcodeplan.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(gcodeplan);
    }
  });
};

/**
 * Show the current Gcodeplan
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var gcodeplan = req.gcodeplan ? req.gcodeplan.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  gcodeplan.isCurrentUserOwner = req.user && gcodeplan.user && gcodeplan.user._id.toString() === req.user._id.toString();

  res.jsonp(gcodeplan);
};

/**
 * Update a Gcodeplan
 */
exports.update = function(req, res) {
  var gcodeplan = req.gcodeplan;

  gcodeplan = _.extend(gcodeplan, req.body);

  gcodeplan.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(gcodeplan);
    }
  });
};

/**
 * Delete an Gcodeplan
 */
exports.delete = function(req, res) {
  var gcodeplan = req.gcodeplan;

  gcodeplan.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(gcodeplan);
    }
  });
};

/**
 * List of Gcodeplans
 */
exports.list = function(req, res) {
  Gcodeplan.find().sort('-created').populate('user', 'displayName').exec(function(err, gcodeplans) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(gcodeplans);
    }
  });
};

/**
 * Gcodeplan middleware
 */
exports.gcodeplanByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Gcodeplan is invalid'
    });
  }

  Gcodeplan.findById(id).populate('user', 'displayName').exec(function (err, gcodeplan) {
    if (err) {
      return next(err);
    } else if (!gcodeplan) {
      return res.status(404).send({
        message: 'No Gcodeplan with that identifier has been found'
      });
    }
    req.gcodeplan = gcodeplan;
    next();
  });
};
