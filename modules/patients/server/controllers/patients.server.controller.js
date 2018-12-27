'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    config = require(path.resolve('./config/config')),
    multer = require('multer'),
    fs = require('fs'),
    Patient = mongoose.model('Patient'),
    Record = mongoose.model('Record'),
    archiver = require('archiver'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Patient
 */
exports.create = function (req, res) {
    var patient = new Patient(req.body);

    patient.user = req.user;
    var software= req.session.software || req.body.software;
    if (software)
        patient.software= software;

    patient.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(patient);
        }
    });
};

/**
 * Show the current Patient
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var patient = req.patient ? req.patient.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    patient.isCurrentUserOwner = req.user && patient.user && patient.user._id.toString() === req.user._id.toString();

    res.jsonp(patient);
};

/**
 * Check if current Patient record exist
 */
exports.checkIfFileExist = function (req, res) {
  // convert mongoose document to JSON
  var patient = req.patient ? req.patient.toJSON() : {};
  if (fs.existsSync(patient.lastupdate)) {
    return res.status(200).send({
      message: errorHandler.getErrorMessage("Records exist!")
    });
  }
  else {
    return res.status(204).send({
      message: errorHandler.getErrorMessage("Records not exist")
    });
  }
};

/**
 * Update a Patient
 */
exports.update = function (req, res) {
    var patient = req.patient;

    patient = _.extend(patient, req.body);
    // console.log(req.body.Memo.replace(/\n/g, "\n\r"));
    patient.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {



            res.jsonp(patient);
        }
    });
};

/**
 * Delete an Patient
 */
exports.delete = function (req, res) {
    var patient = req.patient;

    patient.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(patient);
        }
    });
};


exports.findBy = function (req, res) {
   // console.log(req.user);
    if (req.user) {
        var q = {};
        if (req.session.software)
            q = {user: req.user._id, software: req.session.software};
        else {
            q = {user: req.user._id};
        }
        Patient.find(q).sort('-created').populate('user').populate({path:'parentPatient',model:'Patient'}).exec(function (err, patients) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {

                res.jsonp(patients);
            }
        });
    } else {
        return res.status(403).json({
            message: 'User is not authorized'
        });
    }

};


exports.downloadLast = function (req, res) {
    // convert mongoose document to JSON
    var patient = req.patient ? req.patient.toJSON() : {};

    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=' + patient.PatientCode + '.paya'
    });
    var zip = archiver('zip');
    zip.pipe(res);
    zip.directory(patient.lastupdate, false)
        .finalize();

};

exports.download = function (req, res) {
    // convert mongoose document to JSON
    var patient = req.patient ? req.patient.toJSON() : {};

    res.writeHead(200, {


    'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=' + patient.PatientCode + '.paya'
    });
    var zip = archiver('zip');
    zip.pipe(res);
    zip.directory(patient.main, false)
        .finalize();

};

/**
 * List of Patients
 */
exports.list = function (req, res) {
    var q = {};
    if (req.session.software)
        q = {user: req.user._id, software: req.session.software};
    else {
        q = {user: req.user._id};
    }
    Patient.find(q).populate({path:'parentPatient',model:'Patient'}).sort('-created').exec(function (err, patients) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
           // console.log(patients);
            res.jsonp(patients);
        }
    });
};

/**
 * Patient middleware
 */
exports.patientByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Patient is invalid'
        });
    }

    Patient.findById(id).populate('user', 'displayName').populate({path:'parentPatient',model:'Patient'}).exec(function (err, patient) {
        if (err) {
            return next(err);
        } else if (!patient) {
            return res.status(404).send({
                message: 'No Patient with that identifier has been found'
            });
        }
        req.patient = patient;
        next();
    });
};
