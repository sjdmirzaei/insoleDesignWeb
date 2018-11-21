'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Softwareupdate = mongoose.model('Softwareupdate'),
    multer = require('multer'),
    config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');



/**
 * Create a Record
 */
exports.import = function (req, res) {


    var user = req.user;
    var multerConfig;
    multerConfig = config.uploads.softwareupdate.file;

    // Filtering to upload only images
    //multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;

    var upload = multer(multerConfig).single('updateFile');

    if (user) {

        uploadPayafile()
            .then(createRecord)
            .then(updateFiles)
            .then(function () {
                res.json({success: true});
            })
            .catch(function (err) {
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

            var payafileURL = config.uploads.storage === 's3' && config.aws.s3 ?
                req.file.location :
                '/' + req.file.path;

            payafileURL = req.file.path;

            var softwareupdate = new Softwareupdate(req.body);

            softwareupdate.user = req.user;
            softwareupdate.filePath=payafileURL;
            softwareupdate.save(function(err) {
                if (err) {
                    reject();

                } else {
                    resolve();
                }
            });

        });
    }


};
/**
 * Create a Softwareupdate
 */
exports.create = function(req, res) {
  var softwareupdate = new Softwareupdate(req.body);

  softwareupdate.user = req.user;

  softwareupdate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(softwareupdate);
    }
  });
};

/**
 * Show the current Softwareupdate
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var softwareupdate = req.softwareupdate ? req.softwareupdate.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  softwareupdate.isCurrentUserOwner = req.user && softwareupdate.user && softwareupdate.user._id.toString() === req.user._id.toString();

  res.sendFile('/home/admin/mnr/payatek-insole/'+softwareupdate.filePath);
  //res.jsonp(softwareupdate);
};

/**
 * Update a Softwareupdate
 */
exports.update = function(req, res) {
  var softwareupdate = req.softwareupdate;

  softwareupdate = _.extend(softwareupdate, req.body);

  softwareupdate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(softwareupdate);
    }
  });
};

/**
 * Delete an Softwareupdate
 */
exports.delete = function(req, res) {
  var softwareupdate = req.softwareupdate;

  softwareupdate.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(softwareupdate);
    }
  });
};

/**
 * List of Softwareupdates
 */
exports.list = function(req, res) {
  Softwareupdate.find().sort('-created').populate('user', 'displayName').exec(function(err, softwareupdates) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(softwareupdates);
    }
  });
};

/**
 * Softwareupdate middleware
 */
exports.softwareupdateByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Softwareupdate is invalid'
    });
  }

  Softwareupdate.findById(id).populate('user', 'displayName').exec(function (err, softwareupdate) {
    if (err) {
      return next(err);
    } else if (!softwareupdate) {
      return res.status(404).send({
        message: 'No Softwareupdate with that identifier has been found'
      });
    }
    req.softwareupdate = softwareupdate;
    next();
  });
};
