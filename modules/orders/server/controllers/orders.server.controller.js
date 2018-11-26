'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    User = mongoose.model('User'),
    Patient = mongoose.model('Patient'),
    Record = mongoose.model('Record'),
    Transaction = mongoose.model('Transaction'),
    fs = require('fs'),
    chalk = require('chalk'),
    efs = require('fs-extra'),
    Priceplan = mongoose.model('Priceplan'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Order
 */
exports.create = function (req, res) {
    var order = new Order(req.body);
    order.user = req.user;
    order.orderer = req.user;

    if (order.sendTome) {
        order.orderPrice = 0;
        order.cncUser = order.orderer;
        order.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(order);
            }
        });
    } else {

        Priceplan.findOne({_id: order.pricePlan}, function (err, doc) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else if (order) {
                if (!doc.price) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage("پلن خرید انتخاب نشده است")
                    });
                }
                if (order.doDesign)
                    order.orderPrice = doc.price;
                else
                    order.orderPrice = doc.purePrice;
                order.pricePlanName=doc.name;
                //order.orderPrice = doc.price;
                order.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.jsonp(order);
                    }
                });
            } else {
                res.jsonp({msg: "NO Price Plan Found"});
            }

        })

    }
};


/**
 * Show the current Order
 */
exports.read = function (req, res) {
     Order.findOne({_id: req.order._id}).populate({path:'patient',model:'Patient'}).populate('user', 'displayName').populate('pricePlan').populate('orderer', 'displayName email').populate('cncUser', 'displayName').exec(function (err, order) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (!order) {
            return res.status(404).send({
                message: 'No Order with that identifier has been found'
            });
        }
        res.json(order);
    });
};

/**
 * Update a Order
 */
exports.pay = function (req, res) {
    var docArray = [];
    var result = [];
    var total = docArray.length;
    function createMemo(obj) {
        if (obj.doDesign==true) {
            obj.doDesign = "همراه با طراحی";
        }
        if (obj.doDesign==false) {
            obj.doDesign = "بدون طراحی";
        }
        return ""+
            obj.ordererConame +"" +
            ""
        +
            ","
        +
            obj.patientPhone
        +
            ","
        +
            obj.doDesign+"-"+obj.pricePlan+"" +
            ""
        +
            "توضیحات بیمار:"
        +
            obj.apMemo+"" +
            ""
        +
            "توضیحات سفارش:"
        +
            obj.desc+"" +
            ""
        +
            "----------"

    }
    function saveAll(cb) {

        var c = docArray.pop();
        c._id=undefined;
        c.__v=undefined;


            var doc = new Record(c);

            doc.save(function (err, saved) {
                total = total - 1;
                if (err) {
                    console.log(err);
                } else {
                    console.log(saved);
                    result.push(saved);
                    if (total != -1) {
                        saveAll(cb)
                    }
                    else {
                        docArray = [];
                        result = [];
                        total = 0;
                        cb();
                    } // all saved here
                }
            })

    }

    var orderId = req.body.orderId;


    Order.findOne({
        _id: orderId,
        status: "NOTPAYED",
        user: req.user._id
    }).exec(function (err, order) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else {

            if (order) {
                var mrecords = [];
                mrecords = order.records;
                console.log(order.records);

                User.findOne({_id: order.orderer}).populate("pricePlan").exec(function (err, doc) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        if (false && !order.doDesign){    //temporary disable creditPlan
                          // console.log(chalk.blue("Check design package:"));
                          // console.log(doc);
                          if(!(doc.creditPlan)){ //req.user._doc
                            return res.status(200).send({
                              msgtype: "error",
                              message: "بسته طراحی وجود ندارد"
                            });
                          }
                          else if(doc.expireCreditDate-new Date()<=0){
                            return res.status(200).send({
                              msgtype: "error",
                              message: "مدت اعتبار بسته طراحی به پایان رسیده است"
                            });
                          }else if(doc.creditPlan.totalorder<=0){
                            return res.status(200).send({
                              msgtype: "error",
                              message: "تعداد بسته طراحی به پایان رسیده است"
                            });
                          }else{
                            doc.creditPlan.totalorder = doc.creditPlan.totalorder-1;
                          }
                        }

                      var inc = {
                          $inc: {credit: order.orderPrice * -1},
                          $set: {creditPlan: doc.creditPlan}
                      };

                      // var software = "PT-InsoleDesign";
                      var minusPrice = false;

                      if (order.sendTome) {
                        order.cncUser = order.orderer
                        order.orderPrice = {}
                      }
                      if (order.cncUser.equals(order.orderer)) {
                        inc = {
                          $inc: {credit: 0},
                          $set: {creditPlan: doc.creditPlan}
                        };
                        // software = "PT-SCANSUIT";

                        minusPrice = true;
                      } else {
                        if (doc.credit - order.orderPrice >= 0) {
                          minusPrice = true;
                        } else {
                          minusPrice = false;
                        }
                      }
                        if (minusPrice) {
                          //var orderer_inc = inc;
                            // User.findOneAndUpdate({_id: order.orderer}, inc, function (err, doc) {
                              User.findOne({_id: order.orderer}, function (err, doc) {
                                if (err) {
                                    return res.status(400).send({
                                        message: errorHandler.getErrorMessage(err)
                                    });
                                } else {
                                    var usercredit = doc.credit;
                                    // Order.findOneAndUpdate({_id: orderId, status: "NOTPAYED"}, {
                                    //   //Order.findOne({_id: orderId, status: "NOTPAYED"}
                                    //   status: "PAYED",
                                    //         payedDate: Date.now()
                                    //     }
                                      Order.findOne({_id: orderId, status: "NOTPAYED"}
                                      , function (err, order) {
                                            if (err) {
                                                return res.status(400).send({
                                                    message: errorHandler.getErrorMessage(err)
                                                });
                                            }
                                            else {

                                                Patient.findOne({_id: order.patient}, function (err, patient) {
                                                    if (err) {
                                                        return res.status(400).send({
                                                            message: errorHandler.getErrorMessage(err)
                                                        });
                                                    }
                                                    else {
                                                        //  var newP = Object.assign({}, patient);

                                                        var pathArray = patient.lastupdate.split('/');

                                                        var baseUploadPath = './uploads/' + "Orders" + "/";

                                                        var userFolder = baseUploadPath + order.cncUser;
                                                        var softwareFolder = userFolder + "/" + "PT-InsoleDesign";
                                                        var patientFolder = softwareFolder + "/" + patient._id;

                                                        var patientRecordFolder = patientFolder + "/" + pathArray[5];
                                                        var patientMainFolder = patientRecordFolder + "/main";
                                                        var patientLastUpdateFolder = patientRecordFolder + "/lastupdate";

                                                        if (!fs.existsSync(baseUploadPath)) fs.mkdirSync(baseUploadPath);
                                                        if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder);
                                                        if (!fs.existsSync(softwareFolder)) fs.mkdirSync(softwareFolder);


                                                        efs.copySync(patient.lastupdate, patientLastUpdateFolder);
                                                        efs.copySync(patient.main, patientMainFolder);


                                                        //var newPatient = JSON.parse(fs.readFileSync(patient.lastupdate + "/PatientProfile", 'utf8'));

                                                        var ap = JSON.parse(JSON.stringify(patient));
                                                        var oldPatientID = patient._id;
                                                        ap._id = undefined;
                                                        ap.__v = undefined;

                                                        var newPatient = new Patient(ap);

                                                        newPatient.software = "PT-InsoleDesign";
                                                        newPatient.FilePath = "Patient_" + newPatient._id + ".paya";
                                                        var obj= {
                                                            apMemo:ap.Memo,
                                                            ordererConame:doc.coName,
                                                            patientPhone:patient.Phone,
                                                            patientMobile:patient.Phone,
                                                            desc:order.desc,
                                                            doDesign:order.doDesign,
                                                            pricePlan:order.pricePlanName
                                                        }
                                                        newPatient.Memo = createMemo(obj);

                                                      //  newPatient.Memo="-" + order.desc;
                                                        newPatient.parentPatient=oldPatientID;
                                                        newPatient.PatientCode = order.sid;
                                                        newPatient.NationalCode = ap.NationalCode;
                                                        newPatient.user = order.cncUser;
                                                        newPatient.lastupdate = patientLastUpdateFolder;
                                                        newPatient.main = patientMainFolder;
                                                        newPatient.created = Date.now();

                                                        newPatient.save(function (err, saved) {
                                                            if (err) {
                                                                return res.status(400).send({
                                                                    message: errorHandler.getErrorMessage(err)
                                                                });
                                                            }
                                                            else {
                                                                var newPatientId = saved._id;
                                                                var transaction = new Transaction();
                                                                transaction.detail = "پرداخت هزینه سفارش";
                                                                transaction.order = orderId;
                                                                transaction.user = req.user._id;
                                                                transaction.orderPrice = order.orderPrice;
                                                                transaction.deposit=order.orderPrice;
                                                               // transaction.deposit=0;

                                                                transaction.save(function (err) {
                                                                    if (err) {
                                                                        return res.status(400).send({
                                                                            message: errorHandler.getErrorMessage(err)
                                                                        });
                                                                    } else {
                                                                        console.log("mrecords");
                                                                        console.log(mrecords);

                                                                        Record.find({
                                                                            _id: {$in: mrecords}
                                                                        }, function (err, d) {

                                                                            d.forEach(function (record2) {
                                                                                // console.log(saved);
                                                                                // console.log("GOH");
                                                                                console.log("Ticked");
                                                                                console.log(record2.name);
                                                                                console.log("new patient id");
                                                                                console.log(newPatientId);
                                                                                var record = {};

                                                                                record.ExamProfile = {};
                                                                                record.ExamProfile.ExamName = record2.ExamProfile.ExamName;
                                                                                record.ExamProfile.Date = record2.ExamProfile.Date;
                                                                                record.ExamProfile.ExamType = record2.ExamProfile.ExamType;
                                                                                record.ExamProfile.Memo = record2.ExamProfile.Memo;
                                                                                record.ExamProfile.Pressure = record2.ExamProfile.Pressure;
                                                                                record.ExamProfile.DetailType = record2.ExamProfile.DetailType;
                                                                                record.ExamProfile.Status = record2.ExamProfile.Status;

                                                                                record.name = record2.name;
                                                                                record.user = order.cncUser;
                                                                                record.patient = newPatientId;
                                                                                record.uploadUrl = './uploads';
                                                                                record.path = saved.main + "/" + record2.name;
                                                                                record.main = saved.main;
                                                                                record.lastupdate = saved.main + "/" + record2.lastupdate;
                                                                                record.type = "new";
                                                                                total = docArray.length;
                                                                                docArray.push(record);
                                                                            });
                                                                                Record.find({
                                                                                    patient: oldPatientID,
                                                                                    _id: {$nin: mrecords}
                                                                                }, function (err, d) {
                                                                                    d.forEach(function (record2) {
                                                                                        efs.removeSync(saved.main + "/" + record2.name);
                                                                                        efs.removeSync(saved.lastupdate + "/" + record2.name);
                                                                                        console.log("deleted:" + saved.lastupdate + "/" + record2.name);
                                                                                    });
                                                                                    saveAll(function () {
                                                                                      User.findOneAndUpdate({_id: order.orderer}, inc, function (err, doc) {
                                                                                        if(err){
                                                                                          console.log(err);
                                                                                          return res.status(200).send({
                                                                                            msgtype: "error",
                                                                                            message: "ُخطا در کسر وجه"
                                                                                          });
                                                                                        }
                                                                                      });
                                                                                      User.findOneAndUpdate({_id: order.cncUser}, {
                                                                                        $inc: {credit: order.orderPrice}, //req.session.amount},
                                                                                      }, function (err, doc) {
                                                                                        if(err){
                                                                                          console.log(err);
                                                                                          return res.status(200).send({
                                                                                            msgtype: "error",
                                                                                            message: "ُخطا در انتقال وجه"
                                                                                          });
                                                                                        }
                                                                                        // console.log(doc.credit);
                                                                                      });
                                                                                      Order.findOneAndUpdate({_id: orderId, status: "NOTPAYED"}, {
                                                                                        status: "PAYED", payedDate: Date.now()
                                                                                      }, function (err, order) {
                                                                                        if(err){
                                                                                          console.log(err);
                                                                                          return res.status(200).send({
                                                                                            msgtype: "error",
                                                                                            message: "ُخطا در تغییر وضعیت سفارش"
                                                                                          });
                                                                                          }
                                                                                      });
                                                                                        console.log(chalk.blue("Success Insole Order"));
                                                                                        // console.log(doc.creditPlan);
                                                                                        // console.log(doc.credit);
                                                                                        // console.log("All Saved!");
                                                                                      // var myNewDoc = doc;
                                                                                      // User.findOne({_id: order.orderer}, function (err, newDoc) {
                                                                                      //   if(!err){
                                                                                      //     myNewDoc = newDoc;
                                                                                      //   }
                                                                                      // });
                                                                                        res.status(200).send({
                                                                                            newcreditPlan: doc.creditPlan,
                                                                                            newcredit: usercredit - order.orderPrice,
                                                                                            msgtype: "success",
                                                                                            message: "ُسفارش شما با موفقیت انجام شد"
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    );
                                }
                            })
                        } else {
                            res.status(200).send({
                                msgtype: "error",
                                message: "اعتبار کافی برای انجام این سفارش وجود ندارد"
                            });
                        }
                    }
                })

            } else {
                res.jsonp({
                    msgtype: "error",
                    message: "امکان پرداخت سفارش شخص دیگر وجود ندارد، یا خطایی رخ داده است"
                });
            }
        }
    });
};

exports.copy = function (req, res) {
    var software = "PT-InsoleDesign";
    var docArray = [];
    var result = [];
    var total = docArray.length;

    function saveAll(cb) {

        var c = docArray.pop();
        console.log(c);
        var doc = new Record(c);
        doc.save(function (err, saved) {
            total = total - 1;
            if (err) {
                console.log(err);
            } else {
                result.push(saved);
                if (total != -1) {
                    saveAll(cb)
                }
                else {
                    docArray = [];
                    result = [];
                    total = 0;
                    cb();
                } // all saved here
            }
        })
    }

    // req.body.patientId="5afc2e67881e424aa8564095";
    if (req.body.patientId) {
        Patient.findOne({_id: req.body.patientId}, function (err, patient) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                //  var newP = Object.assign({}, patient);
                console.log("patient");
                console.log(patient);

                var pathArray = patient.lastupdate.split('/');

                var baseUploadPath = './uploads/';

                var userFolder = baseUploadPath + patient.user;
                var softwareFolder = userFolder + "/" + "PT-InsoleDesign";
                var patientFolder = softwareFolder + "/" + patient._id;
                console.log(pathArray[5]);
                var patientRecordFolder = softwareFolder + "/" + pathArray[5];
                var patientMainFolder = patientRecordFolder + "/main";
                var patientLastUpdateFolder = patientRecordFolder + "/lastupdate";


                if (!fs.existsSync(baseUploadPath)) fs.mkdirSync(baseUploadPath);
                if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder);
                if (!fs.existsSync(softwareFolder)) fs.mkdirSync(softwareFolder);
                if (!fs.existsSync(patientRecordFolder)) fs.mkdirSync(patientRecordFolder);
                if (!fs.existsSync(patientMainFolder)) fs.mkdirSync(patientMainFolder);
                if (!fs.existsSync(patientLastUpdateFolder)) fs.mkdirSync(patientLastUpdateFolder);

                efs.copySync(patient.lastupdate, patientLastUpdateFolder);
                efs.copySync(patient.main, patientMainFolder);


                //var newPatient = new Patient(JSON.parse(fs.readFileSync(patient.lastupdate + "/PatientProfile", 'utf8')));
                var ap = JSON.parse(JSON.stringify(patient));
                ap._id = undefined;
                ap.__v = undefined;

                var newPatient = new Patient(ap);

                newPatient.software = "PT-InsoleDesign";
                newPatient.user = patient.user;
                newPatient.lastupdate = patientLastUpdateFolder;
                newPatient.main = patientMainFolder;

                newPatient.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        Record.find({patient: patient._id}, function (err, mrecords) {


                            if (mrecords) {
                                mrecords.forEach(function (record2) {
                                    var record = {};
                                    record.name = record2.name;
                                    record.user = patient.user;
                                    record.patient = newPatient._id;
                                    record.uploadUrl = './uploads';
                                    record.path = patientMainFolder + "/" + record2.name;
                                    record.main = patientMainFolder;
                                    record.lastupdate = patientLastUpdateFolder;
                                    record.type = "new";
                                    total = docArray.length;
                                    docArray.push(record);
                                    // efs.removeSync(patientMainFolder + "/" + record2.name);
                                    // efs.removeSync(patientLastUpdateFolder + "/" + record2.name);
                                    console.log("deleted:" + patientMainFolder + "/" + record2.name);
                                });
                                saveAll(function () {
                                    res.status(200).send({
                                        msgtype: "success",
                                        message: "ارسال با موفقیت انجام شد"
                                    });
                                });
                            }
                        })


                    }
                })


            }
        })
    } else {
        return res.status(200).send({
            msgtype: "error",
            message: "خطا در انتقال"
        });
    }
};
exports.update = function (req, res) {
    var order = req.order;

    order = _.extend(order, req.body);

    order.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(order);
        }
    });
};

/**
 * Delete an Order
 */
exports.delete = function (req, res) {
    var order = req.order;

    order.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(order);
        }
    });
};

exports.report = function (req, res) {
    if (req.body.type=="NOTPAYED"){
        Order.aggregate([
            {$match: {status:"NOTPAYED",orderer: mongoose.Types.ObjectId(req.user._id)}},
            {$sort: {created: -1}},
            {
                $group: {
                    _id: {$dateToString: {format: "%Y-%m-%d", date: "$created"}},
                    date: {$addToSet: {$dateToString: {format: "%Y-%m-%d", date: "$created"}}},
                    cost:{$sum:"$orderPrice"},
                    count: {$sum: 1}
                }
            },
            {$unwind: "$date"},
            {$sort: {_id: 1}},
            {$limit: 7}

        ]).exec(function (err, data) {

            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                console.log(data);
                res.jsonp(data);
            }

        });
    }
    if (req.body.type=="PAYED"){
        Transaction.aggregate([
            {$match: {type:"ORDER",user: mongoose.Types.ObjectId(req.user._id)}},
            {$sort: {created: -1}},
            {
                $group: {
                    _id: {$dateToString: {format: "%Y-%m-%d", date: "$created"}},
                    date: {$addToSet: {$dateToString: {format: "%Y-%m-%d", date: "$created"}}},
                    cost:{$sum:"$orderPrice"},
                    count: {$sum: 1}
                }
            },
            {$unwind: "$date"},
            {$sort: {_id: 1}},
            {$limit: 7}

        ]).exec(function (err, data) {

            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                console.log(data);
                res.jsonp(data);
            }

        });
    }
    if (req.body.type=="USAGE"){
        var getSize = require('get-folder-size');
        var baseUploadPath = './uploads/';
        var userFolder = baseUploadPath + req.user._id;
        getSize(userFolder, function(err, size){
            res.jsonp([{usage:(size / 1024 / 1024).toFixed(2)}]);
        });
    }
    if (req.body.type=="CNCUSER") {
        Order.aggregate([
            {$match: {cncUser: mongoose.Types.ObjectId(req.user._id)}},
            {$sort: {created: -1}},
            {
                $group: {
                    _id: {$dateToString: {format: "%Y-%m", date: "$created"}},
                    date: {$addToSet: {$dateToString: {format: "%Y-%m", date: "$created"}}},
                    orders: {$sum: 1}
                }
            },
            {$unwind: "$date"},
            {$limit: 12},

        ]).exec(function (err, data) {

            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                console.log(data);
                res.jsonp(data);
            }

        });
    }
    if (req.body.type=="ORDERER") {
        Order.aggregate([
            {$match: {orderer: mongoose.Types.ObjectId(req.user._id)}},
            {$sort: {created: -1}},
            {
                $group: {
                    _id: {$dateToString: {format: "%Y-%m", date: "$created"}},
                    date: {$addToSet: {$dateToString: {format: "%Y-%m", date: "$created"}}},
                    orders: {$sum: 1}
                }
            },
            {$unwind: "$date"},
            {$limit: 12},

        ]).exec(function (err, data) {

            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                console.log(data);
                res.jsonp(data);
            }

        });
    }
    // Order.find(query).sort('-created')
    //     .skip(perPage * page).limit(perPage).populate('patient', 'Email City Age ShoeSize Phone FirstName LastName PatientCode parentPatient').populate('cncUser', 'username displayName').populate('user', 'displayName').populate('orderer', '_id displayName username').exec(function (err, orders) {
    //     if (err) {
    //         return res.status(400).send({
    //             message: errorHandler.getErrorMessage(err)
    //         });
    //     } else {
    //         Order.count(query).exec(function (err, data) {
    //             res.jsonp([orders, data, perPage]);
    //         })
    //
    //     }
    // });
};
/**
 * List of Orders
 */
exports.list = function (req, res) {
    var perPage = 10
        , page = Math.max(0, req.param('page'));

    var isAdmin = (req.user.roles.indexOf("admin") > -1);

    var query = {$or: [{cncUser: req.user._id}, {orderer: req.user._id}]};
    var filter= {$and:[]};

    // if (req.param('fromDate'))
    //     filter.$and.push({created:{"$gte":new Date(req.param('fromDate'))}});
    //
    // if (req.param('toDate'))
    //     filter.$and.push({created:{"$lte":new Date(req.param('toDate'))}});

    // noinspection JSAnnotator
    if (req.param('sid') && req.param('sid')!="") {
        filter.$and.push({sid: req.param('sid')});
        console.log(req.param('sid'));
    }else{
        if (req.param('fromDate') && req.param('fromDate')!="")
            filter.$and.push({created:{"$gte":new Date(req.param('fromDate'))}});

        if (req.param('toDate') && req.param('fromDate')!="")
            filter.$and.push({created:{"$lte":new Date(req.param('toDate'))}});
    }

    if (isAdmin) {
        query = {$and:[query,filter]};
    }

    Order.find(query).sort('-created')
        .skip(perPage * page).limit(perPage).populate('patient', 'Email City Age ShoeSize Phone FirstName LastName PatientCode parentPatient').populate('cncUser', 'username displayName').populate('user', 'displayName').populate('orderer', '_id displayName username').exec(function (err, orders) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            Order.count(query).exec(function (err, data) {
                res.jsonp([orders, data, perPage]);
            })

        }
    });
};

/**
 * Order middleware
 */
exports.orderByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Order is invalid'
        });
    }

    Order.findById(id).populate('patient parentPatient', 'FirstName LastName PatientCode parentPatient').populate('user', 'displayName').populate('pricePlan').populate('orderer', 'displayName email').populate('cncUser', 'displayName').exec(function (err, order) {
        if (err) {
            return next(err);
        } else if (!order) {
            return res.status(404).send({
                message: 'No Order with that identifier has been found'
            });
        }
        req.order = order;
        next();
    });
};
