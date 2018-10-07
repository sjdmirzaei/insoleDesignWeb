'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Priceplan = mongoose.model('Priceplan'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Priceplan
 */
exports.create = function(req, res) {
  var priceplan = new Priceplan(req.body);
  priceplan.user = req.user;

  priceplan.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(priceplan);
    }
  });
};

/**
 * Show the current Priceplan
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var priceplan = req.priceplan ? req.priceplan.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  priceplan.isCurrentUserOwner = req.user && priceplan.user && priceplan.user._id.toString() === req.user._id.toString();

  res.jsonp(priceplan);
};

/**
 * Update a Priceplan
 */
exports.update = function(req, res) {
  var priceplan = req.priceplan;

  priceplan = _.extend(priceplan, req.body);

  priceplan.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(priceplan);
    }
  });
};

/**
 * Delete an Priceplan
 */
exports.delete = function(req, res) {
  var priceplan = req.priceplan;

  priceplan.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(priceplan);
    }
  });
};

/**
 * List of Priceplans
 */
exports.list = function(req, res) {
  var query={};
  if (req.query.type=="my"){
    query={user:req.user._id};
  }else{
      query={user:req.body.user};
  }
  Priceplan.find(query).sort('-created').populate('user', 'displayName').exec(function(err, priceplans) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(priceplans);
    }
  });
};

/**
 * Priceplan middleware
 */
exports.priceplanByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Priceplan is invalid'
    });
  }

  Priceplan.findById(id).populate('user', 'displayName').exec(function (err, priceplan) {
    if (err) {
      return next(err);
    } else if (!priceplan) {
      return res.status(404).send({
        message: 'No Priceplan with that identifier has been found'
      });
    }
    req.priceplan = priceplan;
    next();
  });
};
