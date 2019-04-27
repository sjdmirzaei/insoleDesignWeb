'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  PricePlans = mongoose.model('Priceplan'),
  Transaction = mongoose.model('Transaction'),
  OnlinePayment = mongoose.model('OnlinePayment'),
  OnlinePaymentRecords = mongoose.model('OnlinePaymentRecords'),
  fs = require('fs'),
  chalk = require('chalk'),
  archiver = require('archiver'),
  fse = require('fs-extra'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  // For security purposes only merge these parameters
  user.coName = req.body.coName;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = req.body.roles;
  user.credit = req.body.credit;
  console.log(req.body);
  user.creditPlan = req.body.creditPlan;
  user.gcodePlan = req.body.gcodePlan;
  user.expireCreditDate = req.body.expireCreditDate;

  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

exports.report = function (req, res) {
  User.aggregate([
    {
      $lookup: {
        from: "orders",
        localField: "_id",    // field in the orders collection
        foreignField: "orderer",  // field in the items collection
        as: "orders"
      }
    },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",    // field in the orders collection
        foreignField: "user",  // field in the items collection
        as: "transactions"
      }
    },
    {$unwind: "$transactions"},
    {
      $group: {
        _id: "$transactions.user",
        orders: {$addToSet: "$orders._id"},
        transactions: {$sum: "$transactions.orderPrice"},
        credit: {$addToSet: "$credit"},
        creditPlan: {$addToSet: "$creditPlan"},
        gcodePlan: {$addToSet: "$gcodePlan"}
      }
    },
    {$unwind: "$orders"},
    {
      $project: {
        _id: 1,
        user: "$_id",
        orders: {$size: "$orders"},
        transactions: "$transactions",
        credit: "$credit",
        creditPlan: "$creditPlan",
        gcodePlan: "$gcodePlan"
      }
    },

  ]).exec(function (err, data) {

    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(data);
      User.populate(data, {path: 'user', select: 'displayName'}, function (err, data) {
        res.jsonp(data);
      })

    }

  });
};
/**
 * List of payments
 */
exports.paymentList = function (req, res) {
  console.log("MNR2 Test");
  OnlinePaymentRecords.find({}).exec(function (err, payments) {

    console.log(chalk.red('======='));
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
//       var res=[];
//       for (let i = 0; i <payments.length ; i++) {
// res.push
//       }
          res.json(payments);//result.concat(list));
        }
      });

    };
/**
 * List of transactions
 */
exports.transactionList = function (req, res) {
  OnlinePaymentRecords.find({}).exec(function (err, trans) {
    //console.log("MNR Test");
    //console.log(users);
    console.log(chalk.red('======='));
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      User.find({}).exec(function (err, users) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          var userDict = {};
          var list = [];
          var userCounter = [];
          for (let i = 0; i < users.length; i++) {
            userDict[users[i]._doc._id.toString()] = {
              _id: users[i]._doc._id,
              name: users[i]._doc.firstName + " " + users[i]._doc.lastName,
              gcode: 0,
              transaction: 0,
              payment: 0
            };
          }
          console.log(chalk.yellow('size is: ' + trans.length));
          for (let j = 0; j < trans.length; j++) {
            var user = userDict[trans[j].user.toString()];
            if(user) {
              if (trans[j].type == "ORDER") {
                user.transaction++;
              }
              else if (trans[j].type == "GCODE") {
                user.gcode++;
              }else if (trans[j].type == "PAYMENT") {
                user.payment++;
              }
            }
          }
          for (let i = 0; i < Object.keys(userDict).length; i++) {
            var val = userDict[Object.keys(userDict)[i]];
            if (val.gcode != 0 || val.transaction != 0) {
              let toPush = {
                userId: val._id,
                userName: val.name,
                transactionCount: val.transaction,
                gcodeCount: val.gcode,
                paymentCount: val.payment
              };
              userCounter.push(toPush);
            }
          }
          // var seperator = [];
          // seperator.push( {
          //   userId: 'seperator',
          //   userName: 'xxxxx',
          //   transactionCount: 'xxxxx',
          //   gcodeCount: 'xxxxx'
          // });
          // var result = userCounter.concat(seperator);
          res.json(userCounter);//result.concat(list));
        }
      });

    }
  });

  function getUserName(users, userId) {
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id.toString() == userId.toString()) {
        return users[i]._doc;
      }
    }

  }
};
/**
 * List of folders
 */
exports.folderList = function (req, res) {
  var fsUtils = require("nodejs-fs-utils");
  var baseUploadPath = './uploads/';
  var list = [];
  var i, j;
  var k = 0;
  User.find({}).exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      list = list.concat(readDir('./uploads/', users));
      list = list.concat(readDir('/home/admin/paya/payainsole/', users));
      // var usage=[];
      // var items = fs.readdirSync(baseUploadPath){//}, function(err, items) {
      //   for(i=0; i<items.length; i++){
      //     var userFolder = baseUploadPath+items[i];
      //     var size= 0;//fsUtils.fsizeSync(userFolder);
      //       usage[i] = (size / 1024 / 1024).toFixed(2);
      //       for(j=0; j<users.length; j++){
      //         if(items[i] == users[j]._id){
      //           var toPush = {path:items[i], usage:usage[i], user:users[j]};
      //           list[k]=(toPush);
      //           k=k+1;
      //           break;
      //         }
      //       }
      //       if(items[i] != "Orders" && j==users.length){
      //         var toPush = {path:items[i], usage:usage[i]};
      //         list[k]=(toPush);
      //         k=k+1;
      //       }
      //   }
      //
      // }//);
      for (j = 0; j < users.length; j++) {  //if there was users that dont have folders
        var found = false;
        for (i = 0; i < list.length; i++) {
          if (list[i].user && list[i].user._id == users[j]._id) {
            found = true;
            break;
          }
        }
        if (found == false) {
          var toPush = {path: "", usage: 0, user: users[j]};
          list[k] = (toPush);
          k = k + 1;
        }
      }
      res.json(list);
    }
  });

  function readDir(baseFolder, users) {
    var usage = [];
    if (fs.existsSync(baseFolder)) {
      var items = fs.readdirSync(baseFolder)
      {//}, function(err, items) {
        for (i = 0; i < items.length; i++) {
          var userFolder = baseFolder + items[i];
          var size = fsUtils.fsizeSync(userFolder);
          usage[i] = (size / 1024 / 1024).toFixed(2);
          for (j = 0; j < users.length; j++) {
            if (items[i] == users[j]._id) {
              var toPush = {path: userFolder, usage: usage[i], user: users[j]};
              list[k] = (toPush);
              k = k + 1;
              break;
            }
          }
          if (items[i] != "Orders" && j == users.length) {
            var toPush = {path: userFolder, usage: usage[i]};
            list[k] = (toPush);
            k = k + 1;
          }
        }
      }
    }
    return usage;
  }
};
/**
 * Download user folder
 */
exports.completeDownload = function (req, res) {
  console.log(req.params.userPath);
  console.log(req.body);
  var baseUploadPath = './uploads/';
  var completePath = req.params.userPath;//baseUploadPath+req.params.userId;  //req.body.userId
  if (!completePath) {
    return res.status(400).send({
      message:
        "فولدر وجود ندارد"
    });
  }
  res.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-disposition': 'attachment; filename=' + req.params.userId + '.zip'
  });
  var zip = archiver('zip');
  zip.pipe(res);
  zip.directory(completePath, false)
    .finalize();
};
/**
 * Delete only Folder
 */
exports.completeDelete = function (req, res) {
  var baseUploadPath = './uploads/';
  //console.log(req);
  var completePath = req.body.userPath;//baseUploadPath+req.body.userId
  //console.log(completePath);
  // if(!req.body.userId){
  //   return;
  // }
  fse.remove(completePath).then(() => {
    return res.status(200).send({
      message:
        "حذف پوشه با موفقیت انجام شد"
    });
    // User.findByIdAndRemove(req.body.userId, function (err, doc) {
    //   if (err) {
    //     return res.status(200).send({
    //       message: "حذف پوشه با موفقیت انجام شد"
    //     });
    //   }else{
    //       return res.status(200).send({
    //         message:
    //           "حذف کاربر و پوشه با موفقیت انجام شد"
    //       });
    //   }
    // });
  }).catch(() => {
    return res.status(400).send({
      message:
        "حذف  با خطا روبرو شد"
    });
  });
  // fse.remove(baseUploadPath+req.body.userId).then(()=>folderSuccess=true).catch(()=>folderSuccess=false);

  // var msg;
  // if(folderSuccess && sucess)
  //   msg="حذف کاربر و پوشه با موفقیت انجام شد";
  // else if(!folderSuccess && sucess)
  //   msg="حذف کاربر با موفقیت انجام شد";
  // else if(folderSuccess && !sucess)
  //   msg="حذف پوشه با موفقیت انجام شد";
  // else
  //   msg="حذف  با خطا روبرو شد";
  // return res.status(200).send({
  //   message: msg
  // });

};
/**
 * List of Users
 */
exports.list = function (req, res) {
  var query = {};
  if (req.query.role) {
    query = {'roles': {$in: [req.query.role]}};


    PricePlans.find({}).distinct('user').exec(function (err, users) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      console.log(users);
      User.find({_id: {$in: users}}).exec(function (err, users) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        }

        res.json(users);
      });

    });
  }
  else {
    User.find({}).exec(function (err, users) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      res.json(users);
    });
  }


};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password -providerData').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};
