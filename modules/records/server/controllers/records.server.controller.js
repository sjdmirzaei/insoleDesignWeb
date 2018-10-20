'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    config = require(path.resolve('./config/config')),
    multer = require('multer'),
    fs = require('fs'),
    efs = require('fs-extra'),
    mongoose = require('mongoose'),
    StreamZip = require('node-stream-zip'),
    Record = mongoose.model('Record'),
  chalk = require('chalk'),
    Patient = mongoose.model('Patient'),
    archiver = require('archiver'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    shell = require('shelljs'),
    _ = require('lodash');


/**
 * Create a Record
 */
exports.import = function (req, res) {


    var user = req.user;
    var multerConfig;
    multerConfig = config.uploads.paya.file;

    // Filtering to upload only images
    //multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;

    var upload = multer(multerConfig).single('record');

    if (user) {

        uploadPayafile()
            .then(createRecord)
            .then(updateFiles)
            .then(function () {
                res.json({success: true});
            })
            .catch(function (err) {
                console.log(err);
                res.status(422).send(err);
            });
    } else {
        res.status(401).send({
            message: 'User is not signed in'
        });
    }
    function uploadPayafile() {
        return new Promise(function (resolve, reject) {
            upload(req, res, function (uploadError) {
                if (uploadError) {
                    reject(errorHandler.getErrorMessage(uploadError));
                } else {
                    resolve();
                }
            });
        });
    }

    function updateFiles() {
        return new Promise(function (resolve, reject) {

            resolve();
        });
    }

    function createRecord() {
        return new Promise(function (resolve, reject) {

            var software= req.session.software || req.body.software;
            if (!req.body.patient) {
                reject();
            }
            var payafileURL = config.uploads.storage === 's3' && config.aws.s3 ?
                req.file.location :
                '/' + req.file.path;

            payafileURL = req.file.path;

            var zip = new StreamZip({
                file: payafileURL,
                storeEntries: true
            });
            var originalName = req.file.originalname.split(".")[0];
            var isNew = true;
            console.log(chalk.yellow(originalName));
            if (originalName.split("_")[0] == "Patient") {
                isNew = true;
            }
            if (originalName.split("_")[0] == "updatePatient") {
                isNew = false;
            }

            originalName = originalName.split("_")[1];
            originalName = originalName.split("/")[0];

            console.log(software);
            console.log(originalName);
            var baseUploadPath = './uploads/';
            var userFolder = baseUploadPath + user._id;
            var softwareFolder = userFolder + "/" + software;
            var patientFolder = softwareFolder + "/" + req.body.patient;
            var patientRecordFolder = patientFolder + "/" + originalName;
            var patientMainFolder = patientRecordFolder + "/main";
            var patientArchiveFolder = patientRecordFolder + "/archive";
            var patientInsoleFolder = patientRecordFolder + "/PT-InsoleDesign";
            var patientScanFolder = patientRecordFolder + "/PT-SCANSUIT";

            var patientUpdatesFolder = patientRecordFolder + "/updates";
            var patientLastUpdateFolder = patientRecordFolder + "/lastupdate";

            zip.on('error', function (err) {
                console.error('ERROR: ' + err);
            });

            zip.on('extract', function (entry, file) {

            });

            zip.on('ready', function () {
                console.log("Ready");
                var entries = zip.entries();


                if (!fs.existsSync(baseUploadPath)) fs.mkdirSync(baseUploadPath);
                if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder);
                if (!fs.existsSync(softwareFolder)) fs.mkdirSync(softwareFolder);
                if (!fs.existsSync(patientFolder)) fs.mkdirSync(patientFolder);
                if (!fs.existsSync(patientRecordFolder)) fs.mkdirSync(patientRecordFolder);
                if (!fs.existsSync(patientMainFolder)) fs.mkdirSync(patientMainFolder);
                if (!fs.existsSync(patientArchiveFolder)) fs.mkdirSync(patientArchiveFolder);
                if (!fs.existsSync(patientUpdatesFolder)) fs.mkdirSync(patientUpdatesFolder);
                if (!fs.existsSync(patientLastUpdateFolder)) fs.mkdirSync(patientLastUpdateFolder);
                // console.log("entries");
                // console.log(entries);
                // var vals = [];
                // vals = Object.keys(entries).map(function (key) {
                //                 return entries[key];
                //             });
                // console.log("vals");
                // console.log(vals);
                //
                // vals.forEach(function (entry) {
                //     var str = entry.name.split("/");
                //     if (str[1]=="ExamProfile") {
                //         console.log("ExamName");
                //         console.log(JSON.parse(zip.entryDataSync(entry.name)).ExamName);
                //     }
                // });

                var vals = [];


                vals = Object.keys(entries).map(function (key) {
                    return entries[key];
                });

                //zip.close();
                if (isNew) {
                    console.log("Is new Zip");
                    zip.extract(null, patientMainFolder, function(err, count) {

                        var curdirname = "";

                        vals.forEach(function (entry) {
                          //if(file)
                            var file = "test";
                            console.log('extract DIR', entry.isDirectory, entry.name, file);
                            var desc = entry.isDirectory;

                            var rname= entry.name.split("/");
                            if (rname[1]=="ExamProfile")
                            {
                                console.log('IS ExamProfile', entry.isDirectory, entry.name, file);
                                var ExamProfile=JSON.parse(zip.entryDataSync(entry.name));

                                curdirname = rname[0];
                                curdirname = curdirname.split("/")[0];
                                var record = {}
                                record.name = curdirname;

                                record.ExamProfile.ExamName=ExamProfile.ExamName;
                                record.ExamProfile.Date=ExamProfile.Date;
                                record.ExamProfile.ExamType=ExamProfile.ExamType;
                                record.ExamProfile.Memo=ExamProfile.Memo;
                                record.ExamProfile.Pressure=ExamProfile.Pressure;
                                record.ExamProfile.DetailType=ExamProfile.DetailType;
                                record.ExamProfile.Status=ExamProfile.Status;

                                record.user = req.user;
                                record.patient = req.body.patient;
                                record.uploadUrl = req.file.path;
                                record.path = patientMainFolder + "/" + curdirname;
                                record.main = patientMainFolder;
                                record.lastupdate = patientLastUpdateFolder;
                                record.archive=patientArchiveFolder;
                                record.type = "new";
                                var query = {},
                                    options = { upsert: true, new: true, setDefaultsOnInsert: true };
                                Record.findOneAndUpdate({patient:req.body.patient,name:curdirname}, record, options, function(error, result) {

                                        if (error) {
                                            console.log(err);
                                        } else {
                                            Patient.findOneAndUpdate({_id: req.body.patient}, {
                                                $set: {
                                                    lastupdate: patientLastUpdateFolder,
                                                    main: patientMainFolder,
                                                    archive: patientArchiveFolder
                                                }
                                            }).exec(function (err, docs) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    efs.copySync(patientMainFolder, patientLastUpdateFolder);

                                                    //resolve();
                                                }

                                            })
                                        }

                                });


                            } else {
                                console.log('IS Not ExamProfile', entry.isDirectory, entry.name, file);
                                var PatientProfile=JSON.parse(zip.entryDataSync(entry.name));
                                Patient.findOneAndUpdate({_id: req.body.patient}, {
                                    $set: {
                                        "PatientCode":PatientProfile.PatientCode,
                                        "NationalCode":PatientProfile.NationalCode,
                                        "FirstName":PatientProfile.FirstName,
                                        "LastName":PatientProfile.LastName,
                                        "FilePath":PatientProfile.FilePath,
                                        "Gender":PatientProfile.Gender,
                                        "Age":PatientProfile.Age,
                                        "Weight":PatientProfile.Weight,
                                        "Height":PatientProfile.Height,
                                        "Phone":PatientProfile.Phone,
                                        "City":PatientProfile.City,
                                        "PostalCode":PatientProfile.PostalCode,
                                        "Memo":PatientProfile.Memo,
                                        "Address":PatientProfile.Address,
                                        "ShoeSize":PatientProfile.ShoeSize,
                                        "Email":PatientProfile.Email,
                                        "deleteList":PatientProfile.deleteList
                                    }
                                }).exec(function (err, patient) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        PatientProfile.deleteList.forEach(function (item) {
                                            efs.moveSync(patient.main + "/" + item,patient.archive + "/" + item);
                                        });
                                        //efs.copy(patientUpdatesFolder+number,patientLastUpdateFolder);
                                        //resolve();
                                    }

                                })
                            }
                        });
                        zip.close();
                    });
                }
                else {
                    console.log("Is Updated Zip");
                    var number = "/U" + fs.readdirSync(patientUpdatesFolder).length;
                    if (!fs.existsSync(patientUpdatesFolder + number)) fs.mkdirSync(patientUpdatesFolder + number);

                    zip.extract(null, patientUpdatesFolder + number, function (err) {
                        console.log("Going to Extract Zip");
                        // console.log("sds");

                        var curdirname = "";

                        // vals = Object.keys(entries).map(function (key) {
                        //     return entries[key];
                        // });

                        //zip.close();
                        // console.log("vals");
                        console.log(vals);

                        vals.forEach(function (entry) {
                            console.log("Each Val");
                            var desc = entry.isDirectory;
                            var rname= entry.name.split("/");
                            console.log(rname);
                            if (rname[1]=="ExamProfile")
                            {
                                console.log('IS ExamProfile', entry.isDirectory, entry.name);
                                var ExamProfile=JSON.parse(zip.entryDataSync(entry.name));
                                curdirname = rname[0];
                                console.log('IS ExamProfile', entry.isDirectory, entry.name);
                               // curdirname = curdirname.split("/")[0];
                                var record = {ExamProfile:{}};

                                record.ExamProfile.ExamName=ExamProfile.ExamName;
                                record.ExamProfile.Date=ExamProfile.Date;
                                record.ExamProfile.ExamType=ExamProfile.ExamType;
                                record.ExamProfile.Memo=ExamProfile.Memo;
                                record.ExamProfile.Pressure=ExamProfile.Pressure;
                                record.ExamProfile.DetailType=ExamProfile.DetailType;
                                record.ExamProfile.Status=ExamProfile.Status;

                                record.name = curdirname;
                                record.user = req.user;
                                record.uploadUrl = req.file.path;
                                record.patient = req.body.patient;
                                record.path = patientUpdatesFolder + number + "/" + curdirname;
                                record.main = patientMainFolder;
                                record.lastupdate = patientLastUpdateFolder;
                                record.archive=patientArchiveFolder;
                                record.type = "update";
                                var query = {},
                                    options = { upsert: true, new: true, setDefaultsOnInsert: true };

                                Record.findOneAndUpdate({patient:req.body.patient,name:curdirname}, record, options, function(error, result) {
                                    if (error) {
                                        console.log(err);
                                    }else {
                                        Patient.findOneAndUpdate({_id: req.body.patient}, {
                                            $set: {
                                                lastupdate: patientLastUpdateFolder,
                                                main: patientMainFolder,
                                                archive:patientArchiveFolder
                                            }
                                        }).exec(function (err, docs) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                               // efs.copySync(patientMainFolder, patientLastUpdateFolder);
                                                efs.copySync(patientUpdatesFolder + number, patientLastUpdateFolder);
                                                //console.log("Saved");
                                                //resolve();
                                            }
                                        })
                                    }
                                    // do something with the document
                                });
                                // record.save(function (err) {
                                //     if (err) {
                                //         console.log(err);
                                //     } else {
                                //         Patient.findOneAndUpdate({_id: req.body.patient}, {
                                //             $set: {
                                //                 lastupdate: patientLastUpdateFolder,
                                //                 main: patientMainFolder,
                                //                 archive:patientArchiveFolder
                                //             }
                                //         }).exec(function (err, docs) {
                                //             if (err) {
                                //                 console.log(err);
                                //             } else {
                                //                 efs.copySync(patientMainFolder, patientLastUpdateFolder);
                                //                 efs.copySync(patientUpdatesFolder + number, patientLastUpdateFolder);
                                //                 //console.log("Saved");
                                //                 //resolve();
                                //             }
                                //         })
                                //     }
                                // });

                            } else {
                                if (rname[0] == "PatientProfile") {
                                    var PatientProfile = JSON.parse(zip.entryDataSync("PatientProfile"));


                                    Patient.findOneAndUpdate({_id: req.body.patient}, {
                                        $set: {
                                            "PatientCode": PatientProfile.PatientCode,
                                            "NationalCode": PatientProfile.NationalCode,
                                            "FirstName": PatientProfile.FirstName,
                                            "LastName": PatientProfile.LastName,
                                            //"FilePath":PatientProfile.FilePath,
                                            "Gender": PatientProfile.Gender,
                                            "Age": PatientProfile.Age,
                                            "Weight": PatientProfile.Weight,
                                            "Height": PatientProfile.Height,
                                            "Phone": PatientProfile.Phone,
                                            "City": PatientProfile.City,
                                            "PostalCode": PatientProfile.PostalCode,
                                            "Memo": PatientProfile.Memo,
                                            "Address": PatientProfile.Address,
                                            "ShoeSize": PatientProfile.ShoeSize,
                                            "Email": PatientProfile.Email,
                                            "deleteList": PatientProfile.deleteList,
                                            lastupdate: patientLastUpdateFolder,
                                            main: patientMainFolder,
                                            archive:patientArchiveFolder
                                        }
                                    }).exec(function (err, patient) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            efs.copySync(patientUpdatesFolder + number, patientLastUpdateFolder);
                                            PatientProfile.deleteList.forEach(function (item) {
                                                var curdirname = item.split("/")[0];
                                                console.log("deleted: "+curdirname);
                                                try {
                                                    efs.moveSync(patient.lastupdate + "/" + curdirname, patient.archive + "/" + curdirname);
                                                }catch (e) {
                                                    console.log("error deleted: "+curdirname);
                                                }
                                                Record.findOneAndRemove({patient:patient._id,name:curdirname}, function(error, result) {

                                                });
                                            });

                                            //resolve();
                                        }

                                    })

                                }
                            }




                        });
                        zip.close();
                    });
                }


            });
            //zip.close();
            resolve();
        });
    }


};

exports.create = function (req, res) {
    var record = new Record(req.body);
    record.user = req.user;

    record.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(record);
        }
    });
};

exports.downloadLast = function (req, res) {
    // convert mongoose document to JSON
    var record = req.record ? req.record.toJSON() : {};
    console.log(record);
    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=' + record.name + '.paya'
    });
    var zip = archiver('zip');
    zip.pipe(res);
    zip.directory(record.lastupdate, false)
        .finalize();

};

exports.download = function (req, res) {
    // convert mongoose document to JSON
    var record = req.record ? req.record.toJSON() : {};
    console.log(record);
    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=' + record.name + '.paya'
    });
    var zip = archiver('zip');
    zip.pipe(res);
    zip.directory(record.path, false)
        .finalize();

};
/**
 * Show the current Record
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var record = req.record ? req.record.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    record.isCurrentUserOwner = req.user && record.user && record.user._id.toString() === req.user._id.toString();

    res.jsonp(record);
};

/**
 * Update a Record
 */
exports.update = function (req, res) {
    var record = req.record;

    record = _.extend(record, req.body);

    record.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(record);
        }
    });
};

/**
 * Delete an Record
 */
exports.delete = function (req, res) {
    var record = req.record;

    record.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(record);
        }
    });
};

/**
 * List of Records
 */

exports.findBy = function (req, res) {

    var query = {patient: req.body.patient};
    Record.find(query).select('_id user name created type lastupdate ExamProfile').limit(15).exec(function (err, records) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(records);
        }
    });
};
exports.list = function (req, res) {
    Record.find().sort('-created').populate('user', 'displayName').exec(function (err, records) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(records);
        }
    });
};

/**
 * Record middleware
 */
exports.recordByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Record is invalid'
        });
    }

    Record.findById(id).populate('user', 'displayName').exec(function (err, record) {
        if (err) {
            return next(err);
        } else if (!record) {
            return res.status(404).send({
                message: 'No Record with that identifier has been found'
            });
        }
        req.record = record;
        next();
    });
};
