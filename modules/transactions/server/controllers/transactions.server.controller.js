'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  moment = require('moment'),
  Transaction = mongoose.model('Transaction'),
  OnlinePayment = mongoose.model('OnlinePayment'),
  User = mongoose.model('User'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  ZarinpalCheckout = require('zarinpal-checkout'),
  _ = require('lodash');

var zarinpal = ZarinpalCheckout.create('f47973b0-7e73-11e8-86ec-005056a205be', false);

exports.PaymentCallback = function (req, res) {
  OnlinePayment.findOneAndRemove({authority: req.query.Authority}, {
  }, function (err, docPayment) {
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }else{
      console.log(chalk.yellow(docPayment));
      // req.session.amount = doc.amount;
      // req.session.authority = doc.authority;
      // req.session.expire = doc.expire;
      // req.session.software = doc.software;
      // req.session.host = doc.host;
      // req.session.totalorder = doc.totalorder;
      // req.session.price = doc.price;
      // req.session.plantype = doc.plantype;
      zarinpal.PaymentVerification({
        Amount: docPayment.amount,
        Authority: docPayment.authority,
      }).then(function (response) {
        if (response.status == 101) {
          console.log(chalk.blue("101 callback"));
          //var tid = docPayment.transactionId;
          console.log("=============");
          console.log(moment(moment(), "DD-MM-YYYY").add(docPayment.expire, 'days'));
          console.log("=============");
          Transaction.findOneAndUpdate({authority: docPayment.authority}, {
            $set: {
              expireCreditDate: moment(moment(), "DD-MM-YYYY").add(docPayment.expire, 'days'),
              RefID: response.RefID,
              withdraw: docPayment.amount
            }
          }, function (err, doc) {
            console.log("Verified! Ref ID: " + response.RefID);
            res.render('modules/core/server/views/index', {
              response: JSON.stringify(response),
              user: JSON.stringify(req.user),
              software: docPayment.software,
              sharedConfig: JSON.stringify(config.shared)
            });
          })
        }
        else {
          if (response.status == 100) {
            console.log(chalk.blue("Verfy callback"));
            console.log(docPayment.plantype);
            Transaction.findOneAndUpdate({authority: docPayment.authority}, {$set: {RefID: response.RefID}}, function (err, doc) {
              if (docPayment.plantype == "credit plan"){
                var creditPlan = {
                  expire: docPayment.expire,
                  host: docPayment.host,
                  totalorder: docPayment.totalorder,
                  price: docPayment.price,
                  created:new Date()
                };
                console.log(creditPlan);
                User.findOneAndUpdate({_id: req.user._id}, {
                  // $inc: {credit: docPayment.amount},
                  $set: {
                    creditPlan: creditPlan,
                    expireCreditDate: new Date().setDate(creditPlan.created.getDate()+creditPlan.expire)//moment(moment(), "DD-MM-YYYY").add(docPayment.expire, 'days')
                  }

                }, function (err, doc) {
                  if (err)
                    console.log(err);
                  else {
                    //console.log(doc.creditPlan);
                    User.findOne({_id: req.user._id}, function (err, doc) {
                      //console.log(doc.creditPlan);
                      res.render('modules/core/server/views/index', {
                        response: JSON.stringify(response),
                        user: JSON.stringify(doc),
                        software: docPayment.software,
                        sharedConfig: JSON.stringify(config.shared)
                      });
                    });
                  }
                })

              }
              else if (docPayment.plantype == "gcode plan"){
                var gcodePlan = {
                  totalorder: docPayment.totalorder,
                  price: docPayment.price
                };
                console.log(gcodePlan);

                User.findOneAndUpdate({_id: req.user._id}, {
                  // $inc: {credit: docPayment.amount},
                  $set: {
                    gcodePlan: gcodePlan
                  }
                }, function (err, doc) {
                  if (err)
                    console.log(err);
                  else{
                    // console.log(doc.gcodePlan);
                    User.findOne({_id: req.user._id}, function (err, doc) {
                      // console.log(doc.gcodePlan);
                      res.render('modules/core/server/views/index', {
                        response: JSON.stringify(response),
                        user: JSON.stringify(doc),
                        software: docPayment.software,
                        sharedConfig: JSON.stringify(config.shared)
                      });
                    });
                  }
                })
              }
              else{
                console.log(docPayment.amount);
                User.findOneAndUpdate({_id: req.user._id}, {
                  $inc: {credit: docPayment.amount},
                }, function (err, doc) {
                  if (err)
                    console.log(err);
                  else{
                    console.log(doc.credit);
                    User.findOne({_id: req.user._id}, function (err, doc) {
                      res.render('modules/core/server/views/index', {
                        response: JSON.stringify(response),
                        user: JSON.stringify(doc),
                        software: docPayment.software,
                        sharedConfig: JSON.stringify(config.shared)
                      });
                    });
                  }
                })

              }
            })
          }
        }

      }).catch(function (err) {
        console.log(err);
      });
    }
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
      var discription;
      if (typeof(req.body.expire) !== 'undefined'){
        req.session.plantype = "credit plan";
        discription = "خرید بسته طراحی";
      }
      else if (typeof(req.body.totalorder) !== 'undefined'){

        req.session.plantype = "gcode plan";
        discription = "خرید بسته gcode";
      }else{
          req.session.plantype = "credit";
          discription = "افزایش اعتبار";
      }
      console.log(chalk.blue("plan type:"));
      console.log(req.session.plantype);
      var OnlinePaymentSchema = new OnlinePayment();
      OnlinePaymentSchema.amount = req.session.amount;
      OnlinePaymentSchema.authority = req.session.authority;
      OnlinePaymentSchema.expire = req.session.expire;
      OnlinePaymentSchema.software = req.session.software;
      OnlinePaymentSchema.host = req.session.host;
      OnlinePaymentSchema.totalorder = req.session.totalorder;
      OnlinePaymentSchema.price = req.session.price;
      OnlinePaymentSchema.plantype = req.session.plantype;
      OnlinePaymentSchema.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
      });
      var transaction = new Transaction();
      transaction.creditPlan = req.body;
      transaction.user = req.user;
      transaction.detail = discription+" از طریق زرین پال";
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
