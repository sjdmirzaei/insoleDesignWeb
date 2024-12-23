'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    multer = require('multer'),
    multerS3 = require('multer-s3'),
    aws = require('aws-sdk'),
    amazonS3URI = require('amazon-s3-uri'),
    config = require(path.resolve('./config/config')),
    User = mongoose.model('User'),
    Gcode = mongoose.model('Gcode'),
    validator = require('validator'),
    NodeRSA = require('node-rsa');

var whitelistedFields = ['firstName', 'lastName', 'email', 'username', 'coName','bankid','city','phone','creditPlan','expireCreditDate'];

var useS3Storage = config.uploads.storage === 's3' && config.aws.s3;
var s3;

if (useS3Storage) {
    aws.config.update({
        accessKeyId: config.aws.s3.accessKeyId,
        secretAccessKey: config.aws.s3.secretAccessKey
    });

    s3 = new aws.S3();
}

exports.generateKey = function (req, res) {
    var fs = require('fs');
    if (!req.user) {
        return res.status(403).send({});
    }
    var baseUploadPath = './certs/' + req.user._id + "/";
    if (!fs.existsSync("./certs/")) fs.mkdirSync("./certs/");
    if (!fs.existsSync(baseUploadPath)) fs.mkdirSync(baseUploadPath);
    var publicKey = new NodeRSA({b: 2048});
    publicKey.setOptions({encryptionScheme: 'pkcs1'});


    // console.log(publicKey.exportKey("public"));
    // console.log(publicKey.exportKey("private"));
    // if (!fs.existsSync(baseUploadPath+'/'+req.user._id+'_publickey.pub')) {
    fs.writeFileSync(baseUploadPath + '/' + req.user._id + '_publickey.pub', publicKey.exportKey("public"))
    // }
    //  if (!fs.existsSync(baseUploadPath+'/'+req.user._id+'_privatekey.pem')) {
    fs.writeFileSync(baseUploadPath + '/' + req.user._id + '_privatekey.pem', publicKey.exportKey("private"))
    // }
  res.sendFile("/home/admin/mnr/payatek-insole/certs/"+ req.user._id +"/"+ req.user._id + '_publickey.pub');

  // res.sendFile("F:\\Payatek\\WebProjects\\git\\payainsole-master\\certs\\"+ req.user._id +"\\"+ req.user._id + '_publickey.pub');
  // res.sendFile("/home/admin/paya/payainsole/certs/"+ req.user._id +"/"+ req.user._id + '_publickey.pub');
  // res.sendFile("/home/admin/payainsole/certs/"+ req.user._id +"/"+ req.user._id + '_publickey.pub');
    //console.log(fs.readFileSync("D:\\Projects\\payainsole\\"+"/"+baseUploadPath + '/' + req.user._id + '_publickey.pub'));
    //res.sendFile("/home/admin/payainsole/certs/" + req.user._id + '_publickey.pub');

}

exports.getGcode = function (req, res) {
    var fs = require('fs');
    // var CryptoJS = require("crypto");

    var crypto = require("crypto");


    var baseUploadPath = './certs/' + req.user._id + "/";
    var kystring = fs.readFileSync(baseUploadPath + '/' + req.user._id + '_privatekey.pem').toString();
    //console.log(kystring);
    var pvKey = new NodeRSA(kystring);

    var buffer = new Buffer(req.body.IV, "utf8");
    var IV = pvKey.decrypt(req.body.IV);

    var buffer = new Buffer(req.body.Key, "utf8");
    var Key = pvKey.decrypt(req.body.Key);


    var decipher = crypto.createDecipheriv('aes-256-cbc', Key, IV);
    var decrypted = "";

    //  var encryptdata = new Buffer(req.body.encryptedData, "binary");
    var encryptdata = new Buffer(req.body.encryptedData, 'base64').toString('binary');

    decrypted = decipher.update(encryptdata, 'binary', 'utf8');
    decrypted += decipher.final('utf8');

    var orderPrice = 10000;  //For test only
    var gcode = new Gcode();
    gcode.orderPrice=orderPrice;
    gcode.user=req.user._id;
    gcode.data=decrypted;
    gcode.desc=Date.now();
    var gcodeData=JSON.parse(decrypted);

    gcode.PatientFirstName=gcodeData.PatientFirstName;
    gcode.PatientLastName=gcodeData.PatientLastName;
    gcode.InsoleTitle=gcodeData.InsoleTitle;
    gcode.InsoleMemo=gcodeData.InsoleMemo;
    console.log(gcode.InsoleMemo);
    console.log(gcode.InsoleTitle);
    gcode.save(function (err) {
        if (err) {
            return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                payUrl: "/gcodes/"+gcode._id
            });
        }

    })

}


exports.getSTL = function (req, res) {
    var fs = require('fs');
    // var CryptoJS = require("crypto");

    var crypto = require("crypto");


    var baseUploadPath = './certs/' + req.user._id + "/";
    var kystring = fs.readFileSync(baseUploadPath + '/' + req.user._id + '_privatekey.pem').toString();
    //console.log(kystring);
    var pvKey = new NodeRSA(kystring);

    var buffer = new Buffer(req.body.IV, "utf8");
    var IV = pvKey.decrypt(req.body.IV);

    var buffer = new Buffer(req.body.Key, "utf8");
    var Key = pvKey.decrypt(req.body.Key);


    var decipher = crypto.createDecipheriv('aes-256-cbc', Key, IV);
    var decrypted = "";

    //  var encryptdata = new Buffer(req.body.encryptedData, "binary");
    var encryptdata = new Buffer(req.body.encryptedData, 'base64').toString('binary');

    decrypted = decipher.update(encryptdata, 'binary', 'utf8');
    decrypted += decipher.final('utf8');

    var orderPrice = 10000;  //For test only
    var gcode = new Gcode();
    gcode.orderPrice=orderPrice;
    gcode.user=req.user._id;
    gcode.data=decrypted;
    gcode.desc=Date.now();
    var gcodeData=JSON.parse(decrypted);

    gcode.PatientFirstName=gcodeData.PatientFirstName;
    gcode.PatientLastName=gcodeData.PatientLastName;
    gcode.InsoleTitle=gcodeData.InsoleTitle;
    gcode.InsoleMemo=gcodeData.InsoleMemo;
    console.log(gcode.InsoleMemo);
    console.log(gcode.InsoleTitle);
    gcode.save(function (err) {
        if (err) {
            return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                payUrl: "/gcodes/"+gcode._id
            });
        }

    })



/**
 * Update user details
 */
exports.update = function (req, res) {
    // Init Variables
    var user = req.user;

    if (user) {
        // Update whitelisted fields only
        user = _.extend(user, _.pick(req.body, whitelistedFields));

        user.updated = Date.now();
        user.displayName = user.firstName + ' ' + user.lastName;

        user.save(function (err) {
            if (err) {
                return res.status(422).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                req.login(user, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    } else {
        res.status(401).send({
            message: 'User is not signed in'
        });
    }
};

/**
 * Update profile picture
 */
exports.changeProfilePicture = function (req, res) {
    var user = req.user;
    var existingImageUrl;
    var multerConfig;


    if (useS3Storage) {
        multerConfig = {
            storage: multerS3({
                s3: s3,
                bucket: config.aws.s3.bucket,
                acl: 'public-read'
            })
        };
    } else {
        multerConfig = config.uploads.profile.image;
    }

    // Filtering to upload only images
    multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;

    var upload = multer(multerConfig).single('newProfilePicture');

    if (user) {
        existingImageUrl = user.profileImageURL;
        uploadImage()
            .then(updateUser)
            .then(deleteOldImage)
            .then(login)
            .then(function () {
                res.json(user);
            })
            .catch(function (err) {
                res.status(422).send(err);
            });
    } else {
        res.status(401).send({
            message: 'User is not signed in'
        });
    }

    function uploadImage() {
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

    function updateUser() {
        return new Promise(function (resolve, reject) {
            user.profileImageURL = config.uploads.storage === 's3' && config.aws.s3 ?
                req.file.location :
                '/' + req.file.path;
            user.save(function (err, theuser) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    function deleteOldImage() {
        return new Promise(function (resolve, reject) {
            if (existingImageUrl !== User.schema.path('profileImageURL').defaultValue) {
                if (useS3Storage) {
                    try {
                        var {region, bucket, key} = amazonS3URI(existingImageUrl);
                        var params = {
                            Bucket: config.aws.s3.bucket,
                            Key: key
                        };

                        s3.deleteObject(params, function (err) {
                            if (err) {
                                console.log('Error occurred while deleting old profile picture.');
                                console.log('Check if you have sufficient permissions : ' + err);
                            }

                            resolve();
                        });
                    } catch (err) {
                        console.warn(`${existingImageUrl} is not a valid S3 uri`);

                        return resolve();
                    }
                } else {
                    fs.unlink(path.resolve('.' + existingImageUrl), function (unlinkError) {
                        if (unlinkError) {

                            // If file didn't exist, no need to reject promise
                            if (unlinkError.code === 'ENOENT') {
                                console.log('Removing profile image failed because file did not exist.');
                                return resolve();
                            }

                            console.error(unlinkError);

                            reject({
                                message: 'Error occurred while deleting old profile picture'
                            });
                        } else {
                            resolve();
                        }
                    });
                }
            } else {
                resolve();
            }
        });
    }

    function login() {
        return new Promise(function (resolve, reject) {
            req.login(user, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    resolve();
                }
            });
        });
    }
};

/**
 * Send User
 */
exports.me = function (req, res) {
    // Sanitize the user - short term solution. Copied from core.server.controller.js
    // TODO create proper passport mock: See https://gist.github.com/mweibel/5219403
    var safeUserObject = null;
    if (req.user) {
        safeUserObject = {
            displayName: validator.escape(req.user.displayName),
            provider: validator.escape(req.user.provider),
            username: validator.escape(req.user.username),
            created: req.user.created.toString(),
            roles: req.user.roles,
            credit: req.user.credit,
            coName: req.user.coName,
            profileImageURL: req.user.profileImageURL,
            email: validator.escape(req.user.email),
            lastName: validator.escape(req.user.lastName),
            firstName: validator.escape(req.user.firstName),
            additionalProvidersData: req.user.additionalProvidersData
        };
    }

    res.json(safeUserObject || null);
};
