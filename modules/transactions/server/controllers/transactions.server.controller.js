'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  moment = require('moment'),
  Transaction = mongoose.model('Transaction'),
  User = mongoose.model('User'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  ZarinpalCheckout = require('zarinpal-checkout'),
  _ = require('lodash');

var zarinpal = ZarinpalCheckout.create('f47973b0-7e73-11e8-86ec-005056a205be', true);

exports.PaymentCallback = function (req, res) {
  console.log("MNR in callback!!");
  console.log(req.query);
//  console.log(res.session);
//  console.log("MNR");
//  console.log(res);
  zarinpal.PaymentVerification({
    Amount: 1000000,//req.session.amount,
    Authority: req.query.Authority, //req.session.authority,
  }).then(function (response) {
    if (response.status == 101) {
      var tid = req.session.transactionId;
      console.log("=============");
      console.log(moment(moment(), "DD-MM-YYYY").add(req.session.expire, 'days'));
      console.log("=============");
      Transaction.findOneAndUpdate({authority: req.session.authority}, {
        $set: {
          expireCreditDate: moment(moment(), "DD-MM-YYYY").add(req.session.expire, 'days'),
          RefID: response.RefID,
          withdraw: req.session.amount
        }
      }, function (err, doc) {
        console.log("Verified! Ref ID: " + response.RefID);
        res.render('modules/core/server/views/index', {
          response: JSON.stringify(response),
          user: JSON.stringify(req.user),
          software: req.session.software,
          sharedConfig: JSON.stringify(config.shared)
        });
      })

    } else {
      if (response.status == 100) {
        console.log("100");
        Transaction.findOneAndUpdate({authority: req.session.authority}, {$set: {RefID: response.RefID}}, function (err, doc) {

          var creditPlan = {
            expire:2,// req.session.expire,
            host: 10, //req.session.host,
            totalorder: 5, //req.session.totalorder,
            price: 10, //req.session.price
            created:new Date()
          };
          var gcodePlan = {
            //expire:30,// req.session.expire,
            //host: 300, //req.session.host,
            totalorder: 4, //req.session.totalorder,
            price: 10, //req.session.price
          };
//	  console.log("MNR");
//	  console.log(req.user);
//	  console.log("MNR");
          console.log(creditPlan);
          User.findOneAndUpdate({_id: '5a6ef78159047838f7ff3b72'},{//req.user._id}, {
            $inc: {credit: 100}, //req.session.amount},
            $set: {
              gcodePlan: gcodePlan,
              creditPlan: creditPlan,
              expireCreditDate: moment(moment(), "DD-MM-YYYY").add(33, 'days')//req.session.expire, 'days')
            }

          }, function (err, doc) {
            console.log(err);
            User.findOne({_id: '5a6ef78159047838f7ff3b72'}, function (err, doc){//req.user._id}, function (err, doc) {
              res.render('modules/core/server/views/index', {
                response: JSON.stringify(response),
                user: JSON.stringify(doc),
                software: 'PT-SCANSUIT',//req.session.software,
                sharedConfig: JSON.stringify(config.shared)
              });
            });
          })
        })
      }

    }

  }).catch(function (err) {
    console.log(err);
  });
};
/**
 * PaymentRequest
 */
exports.PaymentRequest = function (req, res) {

  zarinpal.PaymentRequest({
    Amount: req.body.price,
    CallbackURL: config.domain + "/paymentCallback",//"https://www.google.com",//
    Description: "شارژ حساب از طریق زرین پال",
    Email: req.user.email,
    Mobile: '09120000000'
  }).then(function (response) {
    if (response.status == 100) {
      req.session.amount = req.body.price;
      req.session.expire = req.body.expire;

      req.session.host = req.body.host;
      req.session.totalorder = req.body.totalorder;
      req.session.price = req.body.price;
      req.session.authority = response.authority;
      console.log(response);

      var transaction = new Transaction();
      transaction.creditPlan = req.body;
      transaction.user = req.user;
      transaction.detail = "شارژ حساب از طریق زرین پال";

      transaction.authority = response.authority;
      transaction.type = "PAYMENT";

      transaction.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          req.session.transactionId = transaction._id;
          res.jsonp(response);
        }
      });
      // res.redirect(response.url);
    }
  }).catch(function (err) {
    console.log(err);
  });
};

exports.PaymentVerification = function (req, res) {
  zarinpal.PaymentVerification({
    Amount: req.params.amount,
    Authority: req.params.token,
  }).then(function (response) {
    if (response.status == 101) {
      res.json(response);
      console.log("Verified! Ref ID: " + response.RefID);
    } else {
      console.log(response);
      res.json(response);
    }
  }).catch(function (err) {
    console.log(err);
  });
};
exports.UnverifiedTransactions = function (req, res) {
  zarinpal.UnverifiedTransactions().then(function (response) {
    if (response.status == 100) {
      console.log(response.authorities);
    }
  }).catch(function (err) {
    console.log(err);
  });
};

exports.RefreshAuthority = function (req, res) {
  zarinpal.RefreshAuthority({
    Authority: req.params.token,
    Expire: req.params.expire
  }).then(function (response) {
    if (response.status == 100) {
      res.send('<h2>You can Use: <u>' + req.params.token + '</u> — Expire in: <u>' + req.params.expire + '</u></h2>');
    }
  }).catch(function (err) {
    console.log(err);
  });
}

/**
 * Create a Transaction
 */
exports.create = function (req, res) {
  var transaction = new Transaction(req.body);
  transaction.user = req.user;

  transaction.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transaction);
    }
  });
};

/**
 * Show the current Transaction
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var transaction = req.transaction ? req.transaction.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  transaction.isCurrentUserOwner = req.user && transaction.user && transaction.user._id.toString() === req.user._id.toString();

  res.jsonp(transaction);
};

/**
 * Update a Transaction
 */
exports.update = function (req, res) {
  var transaction = req.transaction;

  transaction = _.extend(transaction, req.body);

  transaction.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transaction);
    }
  });
};

/**
 * Delete an Transaction
 */
exports.delete = function (req, res) {
  var transaction = req.transaction;

  transaction.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transaction);
    }
  });
};

/**
 * List of Transactions
 */
exports.list = function (req, res) {
  Transaction.find().sort('-created').populate('user', 'displayName').populate('order').populate('orderer').populate('patient').exec(function (err, transactions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transactions);
    }
  });
};

/**
 * Transaction middleware
 */
exports.transactionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Transaction is invalid'
    });
  }

  Transaction.findById(id).populate('user', 'displayName').exec(function (err, transaction) {
    if (err) {
      return next(err);
    } else if (!transaction) {
      return res.status(404).send({
        message: 'No Transaction with that identifier has been found'
      });
    }
    req.transaction = transaction;
    next();
  });
};
