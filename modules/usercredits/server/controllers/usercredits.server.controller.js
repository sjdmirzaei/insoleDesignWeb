'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Usercredit = mongoose.model('Usercredit'),
    moment=require('moment'),
    User = mongoose.model('User'),
    ZarinpalCheckout = require('zarinpal-checkout'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Usercredit
 */
exports.create = function (req, res) {
    var usercredit = new Usercredit(req.body);
    usercredit.user = req.user;

    usercredit.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(usercredit);
        }
    });
};

/**
 * Show the current Usercredit
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var usercredit = req.usercredit ? req.usercredit.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    usercredit.isCurrentUserOwner = req.user && usercredit.user && usercredit.user._id.toString() === req.user._id.toString();

    res.jsonp(usercredit);
};

exports.verify = function (req, res) {
    var usercreditId = req.body.usercreditId;
    console.log(req.body);

    Usercredit.findOneAndUpdate({_id: usercreditId,status:false}, {
        status: true,
        verifyDate: Date.now()
    }, function (err, usercredit) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (usercredit) {
                User.findOneAndUpdate({_id: usercredit.user}, {$inc: {credit: usercredit.fishPrice}}, function (err, doc) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.jsonp(usercredit);
                    }
                })
            }else{
                res.jsonp({msg:"No Record Found"});
            }
        }
    });
};
/**
 * Update a Usercredit
 */
exports.update = function (req, res) {
    var usercredit = req.usercredit;

    usercredit = _.extend(usercredit, req.body);

    usercredit.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(usercredit);
        }
    });
};

/**
 * Delete an Usercredit
 */
exports.delete = function (req, res) {
    var usercredit = req.usercredit;

    usercredit.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(usercredit);
        }
    });
};

/**
 * List of Usercredits
 */
exports.list = function (req, res) {
    var isAdmin = (req.user.roles.indexOf("admin") > -1);

    var query={user:req.user._id};
    if (isAdmin){
        query={};
    }
    Usercredit.find(query).sort('-created').populate('user', 'displayName').exec(function (err, usercredits) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(usercredits);
        }
    });
};

/**
 * Usercredit middleware
 */
exports.usercreditByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Usercredit is invalid'
        });
    }

    Usercredit.findById(id).populate('user', 'displayName').exec(function (err, usercredit) {
        if (err) {
            return next(err);
        } else if (!usercredit) {
            return res.status(404).send({
                message: 'No Usercredit with that identifier has been found'
            });
        }
        req.usercredit = usercredit;
        next();
    });
};
