'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  PricePlans= mongoose.model('Priceplan'),
  fs = require('fs'),
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
    {$unwind:"$transactions"},
    {
      $group:{
        _id: "$transactions.user",
        orders:{$addToSet:"$orders._id"},
        transactions:{$sum:"$transactions.orderPrice"},
        credit:{$addToSet:"$credit"},
        creditPlan:{$addToSet:"$creditPlan"},
        gcodePlan:{$addToSet:"$gcodePlan"}
      }
    },
    {$unwind:"$orders"},
    {
      $project:{
        _id: 1,
        user:"$_id",
        orders:{$size:"$orders"},
        transactions:"$transactions",
        credit:"$credit",
        creditPlan:"$creditPlan",
        gcodePlan:"$gcodePlan"
      }
    },

  ]).exec(function (err, data) {

    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(data);
      User.populate(data,{path:'user',select:'displayName'},function (err,data) {
        res.jsonp(data);
      })

    }

  });
};
/**
 * List of folders
 */
exports.folderList = function (req, res) {
  var fsUtils = require("nodejs-fs-utils");
  // var getSize = require('get-folder-size');
  var baseUploadPath = './uploads/';
  // getSize(baseUploadPath+, function(err, size) {
  //
  // });
  var list = [];
  var i, j;
  var k=0;
  User.find({}).exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else{
      var usage=[];
      fs.readdir(baseUploadPath, function(err, items) {
        for(i=0; i<items.length; i++){
          var userFolder = baseUploadPath+items[i];
          //getSize(us erFolder, function(err, size){
          //var size=0;
          var size= fsUtils.fsizeSync(userFolder);
            usage[i] = (size / 1024 / 1024).toFixed(2);
            for(j=0; j<users.length; j++){
              if(items[i] == users[j]._id){
                // list.push({path:items[i], user:users[j]});
                var toPush = {path:items[i], usage:usage[i], user:users[j]};
                //console.log(toPush);
                list[k]=(toPush);
                k=k+1;
                break;
              }
            }
            if(items[i] != "Orders" && j==users.length){
              var toPush = {path:items[i], usage:usage[i]};
              //console.log(toPush);
              list[k]=(toPush);
              k=k+1;
            }
          //});
        }
        for(j=0; j<users.length; j++){
          var found = false;
          for(i=0; i<list.length; i++){
            if(list[i].user._id == users[j]._id){
              found = true;
              break;
            }
          }
          if(found == false){
            var toPush = {path:"", usage:0, user:users[j]};
            list[k]=(toPush);
            k=k+1;
          }
        }
        //console.log(list);
        res.json(list);
      });
    }
  });

};

/**
 * Delete Folder as well as DB
 */
exports.completeDelete = function (req, res) {
  var baseUploadPath = './uploads/';
  if(!req.body.userId){
    return;
  }
  // var sucess = false;
  // var folderSuccess = false;
  fse.remove(baseUploadPath+req.body.userId
  //   , function(err){
  //   if(err){
  //     folderSuccess=false;
  //   }
  //   else{
  //     folderSuccess = true;
  //   }
  // }
  ).then(()=>
  {
    User.findByIdAndRemove(req.body.userId, function (err, doc) {
      if (err) {
        return res.status(200).send({
          message: "حذف پوشه با موفقیت انجام شد"
        });
      }else{
          return res.status(200).send({
            message:
              "حذف کاربر و پوشه با موفقیت انجام شد"
          });
      }
    });
  }).catch(()=>{
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
  else{
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
