'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Patient Schema
 */
var PatientSchema = new Schema({
    FirstName: {
        type: String,
        default: '',
        required: 'Please fill Patient First Name',
        trim: true
    },
    ID:{type:Number},
    PatientCode: {type: String, trim: true},
    LastName: {type: String, trim: true, required: 'Please fill Patient LastName'},
    Gender: {type: String, required: 'Please fill Patient LastName',default:"Male"},
    Age: {type: Number},
    NationalCode:{type: String},
    Height:{type: Number},
    ShoeSize: {type: Number},
    Weight: {type: Number},
    Phone: {type: String, trim: true},
    Email: {type: String, trim: true},
    City: {type: String, trim: true},
    PostalCode: {type: String, trim: true},
    Address: {type: String, trim: true},
    Memo: {type: String, trim: true},
    FilePath: {type: String, trim: true},
    deleteList:[{type:String}],
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    lastupdate:{
        type: String,
    },
    software:{
        type: String,
        default: 'PT-SCANSUIT',
    },
    archive:{
        type: String,
    },
    main:{
        type: String,
    },
    parentPatient:{
        type: Schema.ObjectId,
        ref: 'Patient',
    }
});

mongoose.model('Patient', PatientSchema);
