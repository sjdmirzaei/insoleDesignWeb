'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Gcode = mongoose.model('Gcode'),
    User = mongoose.model('User'),
    Transaction = mongoose.model('Transaction'),
    path=require('path'),
    fs = require('fs'),
    chalk = require('chalk'),
    config = require(path.resolve('./config/config')),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Gcode
 */
exports.create = function (req, res) {
    var gcode = new Gcode(req.body);
    gcode.user = req.user;

    gcode.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(gcode);
        }
    });
};

exports.download = function (req, res) {
    var gcodeId = req.gcode._id;
    Gcode.findOne({
        _id: gcodeId,
        status: "PAYED",
        user: req.user._id
    }, function (err, docs) {

        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {

            downloadGcode(gcodeId,function (data) {
                res.setHeader("Content-type","application/octet-stream");
                res.sendFile(data,{ root: config.uploads.gcode.file.dest})
            });
        }
    })
}
exports.pay = function (req, res) {
  var gcodeId = req.body.params.gcodeId;
  var payFromPlan = req.body.params.payFromPlan;
  //console.log("Gcode Payment");
  // console.log(req.body.params);
  if (!fs.existsSync("./attaches/gcodes")) fs.mkdirSync("./attaches/gcodes");
  Gcode.findOne({
    _id: gcodeId,
    status: "NOTPAYED",
    user: req.user._id
  },function (err,gcode) {
          User.findOne({_id: req.user._id},function (err,user) {
              if (err) {
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                });
              }
              else{
                if(payFromPlan) {
                  if (user.gcodePlan) {
                    if (user.gcodePlan.totalorder > 0) {   //pay from plan
                      paymentFromPlan(user.gcodePlan);
                    }
                    else {
                      return res.status(200).send({
                        msgtype: "error",
                        message: "بسته gcode به پایان رسیده است"
                      });
                    }
                  }else{
                    return res.status(200).send({
                      msgtype: "error",
                      message: "بسته gcode وجود ندارد"
                    });
                  }
                }
                else {
                  if (user.credit - gcode.orderPrice >= 0) {// pat from credit
                    paymentFromCredit();
                  }
                  else{
                    return res.status(200).send({
                      msgtype: "error",
                      message: "اعتبار کافی برای انجام این سفارش وجود ندارد"
                    });
                  }
                }
              }
          });
  });
  function paymentFromPlan(oldGcodePlan){
    Gcode.findOneAndUpdate({
      _id: gcodeId,
      status: "NOTPAYED",
      user: req.user._id
    }, {status: "PAYED"}, function (err, gcode) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        var newGcodePlan = oldGcodePlan;
        newGcodePlan.totalorder = newGcodePlan.totalorder-1;
        var set = {$set: {gcodePlan: newGcodePlan}};
        User.findOneAndUpdate({_id: req.user._id}, set, function (err, doc) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }
          else{
            updateTransaction(gcode, doc.credit, newGcodePlan);
          }
        });
      }
    });
  }
  function paymentFromCredit(){
    Gcode.findOneAndUpdate({
      _id: gcodeId,
      status: "NOTPAYED",
      user: req.user._id
    }, {status: "PAYED"}, function (err, gcode) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        var inc = {$inc: {credit: gcode.orderPrice * -1}};
        User.findOneAndUpdate({_id: req.user._id}, inc, function (err, doc) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }
          else{
            updateTransaction(gcode, doc.credit - gcode.orderPrice, doc.gcodePlan);
          }
        });
        }
    });
  }
  function updateTransaction(gcode, newCredit, newGcodePlan){
    var transaction = new Transaction();
    transaction.detail = "خرید Gcode";
    transaction.type = "GCODE";
    transaction.gcode = gcodeId;
    transaction.user = req.user._id;
    transaction.orderPrice = gcode.orderPrice;
    transaction.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp({
          newcredit: newCredit,
          newGcodePlan: newGcodePlan,
          msgtype: "success",
          message: "ُسفارش شما با موفقیت انجام شد"
        });
      }
    });
  }
}
var fl=function(v){
    return parseFloat(Math.round(v* 100) / 100).toFixed(3)
}
var downloadGcode = function (gcodeId,cb) {

    if (!fs.existsSync("./attaches/gcodes")) fs.mkdirSync("./attaches/gcodes");

    var SW = fs.createWriteStream(config.uploads.gcode.file.dest + gcodeId + ".paya",{encoding:"utf8"});

    Gcode.findOne({_id: gcodeId}, function (err, gcode) {


        var MainEditor = JSON.parse(gcode.data);

        var Area = MainEditor.Area.split(", ");
        var ToolDiameter = MainEditor.ToolDiameter;
        var SafeZ = MainEditor.SafeZ;
        var FeedRate = MainEditor.FeedRate;
        var verts = MainEditor.Data;
        var StartPosition=MainEditor.StartPosition.split(", ");

        SW.write("(PayaTech Medsole)"+'\r\n');
        SW.write("(------------------------------)"+'\r\n');
        SW.write("(Material:)"+'\r\n');
        SW.write("(    X MIN:0.000   Y MIN:0.000   Z MIN:0.000)"+'\r\n');

        SW.write("(    X MAX:" + fl(Area[0]) + "   Y MAX:" + fl(Area[1]) + "   Z MAX:" + fl(Area[2]) + ")"+'\r\n');
        SW.write("(    X SIZE:" + fl(Area[0]) + "   Y SIZE:" + fl(Area[1]) + "   Z SIZE:" + fl(Area[2]) + ")"+'\r\n');

        SW.write("G21 (MM MODE)"+'\r\n');
        SW.write("G64 (CONSTANT VELOCITY MODE)"+'\r\n');
        SW.write("G90 (ABSOLUTE DISTANCE MODE)"+'\r\n');
        SW.write("G94 (MM/MIN MODE)"+'\r\n');
        SW.write("(=========FIRST TOOL==========)"+'\r\n');
        SW.write("(   TOOL NUMBER:1)"+'\r\n');
        SW.write("(   DESCRIPTION:" + fl(ToolDiameter) + " mm dia. ball nose)"+'\r\n');
        SW.write(""+'\r\n');
        SW.write("(FEED RATES IN MM PER MINUTE) "+'\r\n');
        SW.write("(   CUTTING FEED RATE:" + fl(FeedRate) + ")"+'\r\n');
        SW.write("G49 (CANCEL TOOL OFFSET)"+'\r\n');
        SW.write("T1M6 (GET TOOL)"+'\r\n');
        SW.write("G43 (APPLY TOOL OFFSET)"+'\r\n');
        SW.write("M3 S15000 (SPINDLE ON)"+'\r\n');
        SW.write("G0Z" + fl(SafeZ) + " (GOTO PART HOME Z)"+'\r\n');
        SW.write("G0X" + fl(StartPosition[0]) + "Y" + fl(StartPosition[1]) + " (GOTO PART HOME)"+'\r\n');
        SW.write("(#################################)"+'\r\n');

        SW.write("G1X" + fl(verts[0].split(", ")[0]) + "Y" + fl(verts[0].split(", ")[1]) + "Z" + fl(verts[0].split(", ")[2]) + " F" + fl(FeedRate)+'\r\n');
        var i=1;
        for (i = 1; i < verts.length; i++)
        {
            var v= verts[i].split(", ");
            SW.write("X" + fl(v[0])+ "Y" + fl(v[1]) + "Z" + fl(v[2])+'\r\n');


        }


        SW.write("(#################################)"+'\r\n');
        SW.write("G0Z" + fl(SafeZ) + " (GOTO SAFE Z)"+'\r\n');
        SW.write("M5 (SPINDLE OFF)"+'\r\n');
        SW.write("T0M6 (RETURN TOOL)"+'\r\n');
        SW.write("G0X" + fl(StartPosition[0]) + "Y" + fl(StartPosition[1]) + " (GOTO PART HOME)"+'\r\n');
        SW.write("G0A0 (PARK TOOL CHANGER)"+'\r\n');
        SW.write("G49 (CANCEL TOOL OFFSET)"+'\r\n');
        SW.write("M30 (REWIND)"+'\r\n');
        SW.end();
        SW.on('finish',function () {

            cb(gcodeId + ".paya")

        });


    })


}


/**
 * Show the current Gcode
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var gcode = req.gcode ? req.gcode.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    gcode.isCurrentUserOwner = req.user && gcode.user && gcode.user._id.toString() === req.user._id.toString();

    if (gcode.isCurrentUserOwner) {
        gcode.data = undefined;
        res.jsonp(gcode);
    }

};

/**
 * Update a Gcode
 */
exports.update = function (req, res) {
    var gcode = req.gcode;

    gcode = _.extend(gcode, req.body);

    gcode.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(gcode);
        }
    });
};

/**
 * Delete an Gcode
 */
exports.delete = function (req, res) {
    var gcode = req.gcode;

    gcode.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(gcode);
        }
    });
};

/**
 * List of Gcodes
 */
exports.list = function (req, res) {
    var perPage = 10
        , page = Math.max(0, req.param('page'));

    var isAdmin = (req.user.roles.indexOf("admin") > -1);

    var query = {user: req.user._id};
    if (isAdmin) {
        query = {};
    }

    Gcode.find(query, 'user _id status desc created orderPrice PatientFirstName PatientLastName InsoleTitle InsoleMemo').sort('-created')
        .skip(perPage * page).limit(perPage).populate('user', 'displayName').exec(function (err, gcodes) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            Gcode.count(query).exec(function (err, data) {
                res.jsonp([gcodes, data, perPage]);
            })
        }
    });
};

/**
 * Gcode middleware
 */
exports.gcodeByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Gcode is invalid'
        });
    }

    Gcode.findById(id).populate('user', 'displayName').exec(function (err, gcode) {
        if (err) {
            return next(err);
        } else if (!gcode) {
            return res.status(404).send({
                message: 'No Gcode with that identifier has been found'
            });
        }
        req.gcode = gcode;
        next();
    });
};
